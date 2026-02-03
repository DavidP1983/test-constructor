import { useProfile } from '@/entities/profile-info/model/store';
import { useAvatar } from '@/entities/profile-info/model/useAvatar';
import { notifyForm } from '@/features/profile/user-security/lib/notifyForm';
import { UserService } from '@/features/profile/user-security/services/UserService';
import { ChangePasswordButton } from '@/features/profile/user-security/ui/ChangePasswordButton';
import { DeleteAccountButton } from '@/features/profile/user-security/ui/DeleteAccountButton';
import { notify } from '@/shared/utils/notify';
import { ProfilePage } from '@/widgets/profile/ProfilePage';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { clearAvatarMock, defaultUserProfileStore, handleChangeMock, setThemeMock } from '../../../test/mocks/mockComponents';
import { renderWithClient } from '../../../test/utils/renderWithClient';


// Mock для ChangePasswordButton api services
jest.mock('@/features/profile/user-security/services/UserService', () => ({
    UserService: {
        changePassword: jest.fn(),
        deleteAccount: jest.fn()
    }
}))


describe('Profile Page test', () => {
    // Mock для ChangePasswordButton api services
    const changePasswordMock = UserService.changePassword as jest.Mock;
    const deleteAccountMock = UserService.deleteAccount as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        (useProfile as unknown as jest.Mock)
            .mockImplementation(selector => selector(defaultUserProfileStore))
    });
    afterEach(() => {
        (useAvatar as jest.Mock).mockReturnValue({
            handleChange: handleChangeMock,
            clearAvatar: clearAvatarMock,
            isUploading: false
        });
    });


    test('Render Profile page', () => {
        renderWithClient(<ProfilePage />);

        const title = screen.getByRole('heading', { level: 1, name: 'Profile' });
        expect(title).toBeInTheDocument();
    });


    test('Test UserInfo', async () => {
        renderWithClient(<ProfilePage />);

        const items = ['Name/Nickname: Tony', 'Email: tony@gmail.com', 'Role: User', 'Joined: 2026-02-03'];
        const img = screen.getByRole('img');
        const list = screen.getAllByRole('listitem');

        await waitFor(() => {
            expect(img).toBeInTheDocument();
            list.forEach((item, i) => {
                expect(item).toHaveTextContent(items[i]);
            })
            expect(list).toHaveLength(4);
        });
    });


    test('Test image URL UserInfo if avatar is not empty', () => {
        renderWithClient(<ProfilePage />);

        const img = screen.getByRole('img');

        expect(img).toHaveAttribute('src', 'some url');
    });


    test('Test image URL UserInfo if avatar is empty', () => {
        const mock = useProfile as unknown as jest.Mock;
        mock.mockImplementation(selector => selector({ avatarUrl: undefined }));

        renderWithClient(<ProfilePage />);

        const img = screen.getByRole('img');

        expect(img).toHaveAttribute('src', '/assets/user-icon.webp');
    });



    test('Test label text', async () => {
        (useAvatar as jest.Mock).mockReturnValue({
            handleChange: handleChangeMock,
            clearAvatar: clearAvatarMock,
            isUploading: true
        });

        renderWithClient(<ProfilePage />);

        const label = screen.getByText(/uploading\.\.\./i);
        expect(label).toHaveTextContent(/Uploading.../)
    });


    test('Test call handleChange function', async () => {
        renderWithClient(<ProfilePage />);

        const label = screen.getByText(/Change avatar/i);
        const btn = screen.getByTestId('avatar-input');

        // При работе с файлами
        const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
        await userEvent.upload(btn, file);

        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        expect(label).toHaveTextContent(/Change avatar/i);
    });


    test('Test UserSettings', () => {
        renderWithClient(<ProfilePage />);

        const title = screen.getByRole('heading', { level: 2, name: /Settings/i });
        const link = screen.getByRole('link');

        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent(/Settings/i);
        expect(link).toHaveAttribute('href', '/builder/completed');
    });


    test('Test setTheme function', async () => {
        renderWithClient(<ProfilePage />);

        const btnThemeSun = screen.getByLabelText('icon sun');
        const btnThemeMoon = screen.getByLabelText('icon moon');

        await userEvent.click(btnThemeMoon);

        expect(btnThemeSun).toBeInTheDocument()
        expect(btnThemeMoon).toBeInTheDocument()
        expect(setThemeMock).toHaveBeenCalledWith('dark');
    });


    test('Test UserStats', async () => {
        renderWithClient(<ProfilePage />);

        const pageData = ['Tests - 2 total', 'Today - 1 created', 'Last Activity - Today']
        const title = screen.getByRole('heading', { level: 2, name: /Statistics/i });
        const desc = screen.getAllByTestId('desc');

        await waitFor(() => {
            expect(title).toBeInTheDocument();
            expect(title).toHaveTextContent(/Statistics/i);
            desc.forEach((item, i) => {
                expect(item).toBeInTheDocument();
                expect(item).toHaveTextContent(pageData[i])
            });
        });
    });


    test('Test UserSecurity', () => {
        renderWithClient(<ProfilePage />);

        const title1 = screen.getByRole('heading', { level: 2, name: /Security/i })
        const title2 = screen.getByRole('heading', { level: 3 })

        expect(title1).toBeInTheDocument();
        expect(title2).toBeInTheDocument();
        expect(title1).toHaveTextContent(/Security/i);
        expect(title2).toHaveTextContent(/Danger zone/i);
    });


    test('Test ChangePasswordButton call', async () => {
        (notifyForm as jest.Mock).mockResolvedValue({
            confirm: true,
            data: {
                password: 'old',
                newPassword: 'new'
            }
        });

        const notifyMock = (notify as jest.Mock);

        changePasswordMock.mockResolvedValue(undefined);

        renderWithClient(<ChangePasswordButton />);

        const btn = screen.getByRole('button', { name: /Change password/i });
        await userEvent.click(btn);

        await waitFor(() => {
            expect(changePasswordMock).toHaveBeenCalledTimes(1);   // т.е. в данном случая, проверяем вызов самого api
            expect(changePasswordMock).toHaveBeenCalledWith('old', 'new');
            expect(notifyMock).toHaveBeenCalledWith('success', "Password was changed successfully")
        });
    });


    test('Tests DeleteAccountButton call', async () => {
        (notifyForm as jest.Mock).mockResolvedValue({
            confirm: true,
            data: {
                password: 'old',
            }
        });

        const notifyMock = (notify as jest.Mock);

        deleteAccountMock.mockResolvedValue(undefined);

        renderWithClient(<DeleteAccountButton />);

        const btn = screen.getByRole('button', { name: /Delete account/i });
        await userEvent.click(btn);

        await waitFor(() => {
            expect(deleteAccountMock).toHaveBeenCalledTimes(1);
            expect(deleteAccountMock).toHaveBeenCalledWith('old');
            expect(notifyMock).toHaveBeenCalledWith('success', "Account was deleted")
        });
    });


    test('Test button disabled and spinner', async () => {
        // Для того, чтобы корректно отработал показ спиннер и заблокированной кнопки, я увеличил время выполнения notifyForm до 100ms, так как блок кода finally у меня срабатывал мгновенно, и показа загрузки не успевал отработать
        (notifyForm as jest.Mock).mockImplementation(
            () => new Promise(resolve => setTimeout(
                () => resolve({ confirm: true, data: { password: 'old', newPassword: 'new' } }), 100))
        );

        // Так же увеличил время выполнения данного участка кода
        changePasswordMock.mockImplementation(
            () => new Promise(resolve =>
                setTimeout(() => resolve(undefined), 100))
        );

        renderWithClient(<ChangePasswordButton />);

        const btn = screen.getByRole('button', { name: /Change password/i });
        await userEvent.click(btn);

        const spinner = await screen.findByTestId('spinner')
        expect(btn).toBeDisabled();
        expect(spinner).toBeInTheDocument();

        await waitFor(() => {
            expect(btn).not.toBeDisabled(); // после выполнения кнопка разблокирована
        });
    });
});