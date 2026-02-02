/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHeader } from '@/widgets/header/model/useHeader';
import Header from '@/widgets/header/ui/Header';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { calculateCompletedTestsMock, handleClickMock, handleLogoutMock, registerCompletedTestMock, toggleSwitchMock } from '../../../test/mocks/mockComponents';
import { renderWithClient } from '../../../test/utils/renderWithClient';



describe('Header component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    let mockChannel: { onmessage: jest.Mock<any, any, any>; close: jest.Mock<any, any, any>; };
    // Mock BroadcastChannel
    beforeEach(() => {
        mockChannel = {
            onmessage: jest.fn(),
            close: jest.fn()
        };
        global.BroadcastChannel = jest.fn().mockImplementation(() => mockChannel);
    });


    test('render Header', async () => {

        renderWithClient(<Header />)

        const img = screen.getByAltText('user');
        const userName = screen.getByText(/Tony/);

        await waitFor(() => {
            expect(img).toBeInTheDocument();
            expect(userName).toBeInTheDocument();
        });
    });


    test('Render bell in the document, and check link url', () => {
        renderWithClient(<Header />);

        const bell = screen.getByRole('link', { name: '' });
        const markTotalCompletedTests = screen.getByRole('status');

        expect(bell).toHaveAttribute('href', '/builder/completed?id=mock-id')
        expect(markTotalCompletedTests).toHaveTextContent("1");
    });


    test('Test if menu is open', async () => {
        // Локальное переопределение isOpenMenu: true
        (useHeader as jest.Mock).mockReturnValue({
            myRef: { current: null },
            isOpenMenu: true,
            userData: { id: 'mock-id', name: 'Tony' },
            setTheme: jest.fn(),
            handleClick: handleClickMock,
            handleLogout: handleLogoutMock,
            toggleSwitch: toggleSwitchMock,
            isOn: false,
        });

        renderWithClient(<Header />);

        const clickOnImg = screen.getByAltText('user');
        await userEvent.click(clickOnImg);

        const menu = document.querySelector('.menu');
        expect(menu).toHaveClass('menu active')
    });


    test('test menu items corresponding', async () => {
        renderWithClient(<Header />);

        const menuItems = ['My Tests', 'Completed', 'Profile'];
        const menu = screen.getAllByRole('listitem');
        menuItems.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument()
        })
        expect(menu.length).toBe(5);
    });


    test('Should call handleCreateLink on avatar', async () => {
        renderWithClient(<Header />);

        const img = screen.getByAltText('user');
        await userEvent.click(img);

        await waitFor(() => {
            expect(handleClickMock).toHaveBeenCalledTimes(1);
        })
    });


    test('Should call handleLogout', async () => {
        renderWithClient(<Header />);

        const btnLogout = screen.getByText('Log out');
        await userEvent.click(btnLogout);

        await waitFor(() => {
            expect(btnLogout).toBeInTheDocument();
            expect(handleLogoutMock).toHaveBeenCalledTimes(1);
        })
    });


    test('test toggle theme', async () => {
        (useHeader as jest.Mock).mockReturnValue({
            myRef: { current: null },
            isOpenMenu: false,
            userData: { id: 'mock-id', name: 'Tony' },
            setTheme: jest.fn(),
            handleClick: handleClickMock,
            handleLogout: handleLogoutMock,
            toggleSwitch: toggleSwitchMock,
            isOn: true
        });

        renderWithClient(<Header />);

        const btnSwitch = screen.getByTestId('theme');
        await userEvent.click(btnSwitch);

        expect(toggleSwitchMock).toHaveBeenCalledTimes(1);
        expect(btnSwitch).toHaveClass('on');
    });


    test('BroadcastChannel been called by method from store', async () => {
        renderWithClient(<Header />);

        mockChannel.onmessage({ data: { type: 'TEST_COMPLETED', token: '123' } })


        await waitFor(() => {
            expect(calculateCompletedTestsMock).toHaveBeenCalledTimes(1);
            expect(registerCompletedTestMock).toHaveBeenCalledTimes(1);
        });
    });
})