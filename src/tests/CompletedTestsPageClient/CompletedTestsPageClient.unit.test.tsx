/* eslint-disable @typescript-eslint/no-explicit-any */
import * as completedTestRowVal from '@/entities/table/ui/table-row/completedTestRow';
import { StatusContent } from '@/shared/ui/status-content/StatusContent';
import { CompletedTestsPageClient } from '@/widgets/completedTest-page/CompletedTestsPageClient';
import * as renderRowCompletedVal from '@/widgets/table-row/ui/renderRowCompleted';
import Table from '@/widgets/table/Table';
import { render, screen } from '@testing-library/react';
import { createMockVirtualizer } from '../../../test/mocks/mockComponents';
import { renderWithClient } from '../../../test/utils/renderWithClient';

// Real function
const realRenderRowCompleted = jest.requireActual('@/widgets/table-row/ui/renderRowCompleted').renderRowCompleted;
const realCompletedTestRow = jest.requireActual('@/entities/table/ui/table-row/completedTestRow').completedTestRow;
const mockVirtualizer = createMockVirtualizer(2)

// Mock Hook useAllTests
jest.mock("@/entities/test-operation/hooks/useCompletedTests", () => ({
    useCompletedTests: () => ({
        data: [
            { _id: '1', id: '1', testName: 'CSS' } as any,
            { _id: '2', id: '1', testName: 'HTML' } as any,
        ],
        contentHeader: ["Name", "Date of creation", "Result", "Candidate", "Status", "Actions"],
        status: "success",
        error: null,
    }),
}));


// Mock Hook useTableVirtualizer
jest.mock('@/shared/hooks/useTableVirtualizer', () => ({
    useTableVirtualizer: (dataLength: number) => ({
        parentRef: { current: null },
        virtualizer: {
            getVirtualItems: () => Array.from({ length: dataLength }).map((_, index) => ({
                index,
                key: index,
                size: 60,
                start: index * 60
            })),
            getTotalSize: () => dataLength * 60,
            measure: jest.fn(),
        } as any,
        isMobile: false,
    })
}));



describe('Test CompletedTestsPageClient', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Render CompletedTestsPageClient', () => {

        renderWithClient(<CompletedTestsPageClient />);

        const title = screen.getByRole('heading', { level: 1, name: 'Completed Tests' });
        expect(title).toBeInTheDocument();
    });

    test('check StatusContent render loading', async () => {
        const data = [] as any;
        render(
            <StatusContent
                data={data}
                status='loading'
                error={null}
                renderEmpty={() => <div />}
                renderData={() => <div />} />
        );

        const spinner = await screen.findByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    });


    test('Check empty data', async () => {
        const useCompletedTestsMock = jest.requireMock('@/entities/test-operation/hooks/useCompletedTests');
        const completeMock = jest.spyOn(useCompletedTestsMock, 'useCompletedTests').mockReturnValue({
            data: [],
            contentHeader: ["Name", "Date of creation", "Result", "Candidate", "Status", "Actions"],
            status: "success",
            error: null,
        });

        renderWithClient(<CompletedTestsPageClient />);

        const emptyMessage = await screen.findByText((content, elem) =>
            elem?.tagName === 'DIV' && content.includes('There are no test completed')
        );

        expect(emptyMessage).toBeInTheDocument();
        completeMock.mockRestore();  // Избегая переопределение в дальнейшем, очищаем
    });


    test('Table gets all base header', async () => {

        renderWithClient(<CompletedTestsPageClient />)

        const tableHeaders = await screen.findAllByRole('columnheader');
        expect(tableHeaders.length).toEqual(6);
        expect(tableHeaders.map(h => h.textContent)).toEqual(["Name", "Date of creation", "Result", "Candidate", "Status", "Actions"])
    });


    test('completedTestRow new test added and number of calls renderRowCompleted', async () => {
        (renderRowCompletedVal.renderRowCompleted as jest.Mock).mockImplementation(realRenderRowCompleted);
        (completedTestRowVal.completedTestRow as jest.Mock).mockImplementation(realCompletedTestRow);

        const data = [
            { _id: '1', id: '1', testName: 'CSS', accessToken: '1' } as any,
            { _id: '2', id: '2', testName: 'HTML', accessToken: '' } as any,
        ]



        renderWithClient(
            <Table
                dataRow={data}
                dataHeader={[]}
                renderHeader={() => null}
                renderRow={renderRowCompletedVal.renderRowCompleted}
                token={['1']}
                virtualizer={mockVirtualizer}
            />
        );
        const newElem = await screen.findByRole('status');

        expect(renderRowCompletedVal.renderRowCompleted).toHaveBeenCalledTimes(2);
        expect(newElem).toHaveTextContent('NEW');
    });
});

