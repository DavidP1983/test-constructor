import { TableCompletedActions } from '@/features/table-actions/ui/TableCompletedActions';
import { useCompletedTestsStore } from '@/widgets/test-pass/model/store';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defaultState, mockDeleteCompleted, pushMethod } from '../../../test/mocks/mockComponents';
import { renderWithClient } from '../../../test/utils/renderWithClient';


describe('TableCompletedActions unit test', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        // Каждый тест сбрасываем на defaultState
        (useCompletedTestsStore as unknown as jest.Mock)
            .mockImplementation(selector => selector(defaultState));
    });


    test('renders two buttons', async () => {
        renderWithClient(
            <TableCompletedActions
                testId='1' />
        );

        const btns = screen.getAllByRole('button');
        expect(btns).toHaveLength(2);
    });


    test('shows "Viewed" when test is in viewed list', () => {
        renderWithClient(
            <TableCompletedActions
                testId='1' />
        );
        expect(screen.getByText('Viewed')).toBeInTheDocument();
    });


    test('shows "View result" when test is NOT viewed', () => {
        (useCompletedTestsStore as unknown as jest.Mock).mockImplementation(selector => selector({ viewedTests: [] }));

        renderWithClient(
            <TableCompletedActions
                testId='1' />
        );

        expect(screen.getByText('View result')).toBeInTheDocument();
    });


    test('calls router.push on open button click', async () => {
        renderWithClient(
            <TableCompletedActions
                testId='1' />
        );
        const btn = screen.getByRole('button', { name: /view/i });
        await userEvent.click(btn);

        expect(pushMethod).toHaveBeenCalledTimes(1);
        expect(pushMethod).toHaveBeenCalledWith('/builder/completed/1')
    });


    test('does not show "isViewed" class for unviewed test', () => {
        // Переопределяем глобальный Mock
        const mock = useCompletedTestsStore as unknown as jest.Mock;
        mock.mockImplementation(selector => selector({ viewedTests: [] }));

        renderWithClient(
            <TableCompletedActions
                testId='1' />
        );

        const btn = screen.getByRole('button', { name: 'Delete' });
        expect(btn).not.toHaveClass('isViewed');
    });


    test('calls delete handler and shows "isViewed" class for viewed test', async () => {
        renderWithClient(
            <TableCompletedActions
                testId='1' />
        );

        const btn = screen.getByRole('button', { name: 'Delete' });
        expect(btn).toHaveClass('delete isViewed')

        await userEvent.click(btn);
        expect(mockDeleteCompleted).toHaveBeenCalledTimes(1);
    });
});


