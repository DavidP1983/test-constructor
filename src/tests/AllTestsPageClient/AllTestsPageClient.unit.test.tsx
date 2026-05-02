/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchTest } from '@/features/search-test/ui/SearchTest';
import { StatusContent } from '@/shared/ui/status-content/ui/StatusContent';
import { AllTestsPageClient } from '@/widgets/allTests-page/AllTestsPageClient';
import * as renderRowVal from '@/widgets/table-row/ui/renderRow';
import Table from '@/widgets/table/Table';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockVirtualizer } from '../../../test/mocks/mockComponents';
import { renderWithClient } from '../../../test/utils/renderWithClient';

// Переопределение глобального useAllTests,renderRow mock
const realRenderRow = jest.requireActual('@/widgets/table-row/ui/renderRow').renderRow;
const mockVirtualizer = createMockVirtualizer(2)


// Mock Hook useAllTests
jest.mock("@/entities/test-operation/hooks/useAllTests", () => ({
    useAllTests: () => ({
        data: [
            { _id: '1', name: 'CSS' } as any,
            { _id: '2', name: 'HTML' } as any,
        ],
        contentHeader: ["Test name", "Created", "Participants", "Creator", "Actions"],
        status: "success",
        error: null,
        isPlaceholderData: false,
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



describe('AllTestsPageClient test', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('Test render AllTestsPageClient', async () => {

        renderWithClient(<AllTestsPageClient />)

        const tableHeaders = await screen.findAllByRole('columnheader');
        const linkText = screen.getAllByText(/Create/i)[0] as HTMLAnchorElement;

        expect(screen.getByRole('heading', { name: /My Tests/i })).toBeInTheDocument();
        expect(linkText.href).toContain('/create');

        expect(tableHeaders).toHaveLength(5);
        expect(tableHeaders.map(h => h.textContent)).toEqual(["Test name", "Created", "Participants", "Creator", "Actions"]);
        expect(screen.getByPlaceholderText("Search test...")).toBeInTheDocument();
    });



    test('Test render SearchTest', async () => {
        render(<SearchTest />);

        expect(screen.queryByDisplayValue(/React/)).toBeNull();

        await userEvent.type(screen.getByRole('textbox'), 'React');
        expect(screen.queryByDisplayValue('React')).toBeInTheDocument();
    });



    test('Test render SideBar', async () => {

        renderWithClient(<AllTestsPageClient />)

        const toggle = screen.getByTestId('sidebar-toggle');
        const main = document.querySelector('main');

        expect(main).not.toHaveClass('active');

        await userEvent.click(toggle);
        expect(main).toHaveClass('main active');
    });



    test('render Table with data', async () => {
        // Mock данные в global mockComponents.ts
        (renderRowVal.renderRow as jest.Mock).mockImplementation(realRenderRow);

        renderWithClient(<AllTestsPageClient />)

        expect(await screen.findByText(/CSS/)).toBeInTheDocument();
        expect(await screen.findByText(/HTML/)).toBeInTheDocument();
    });


    test('render Table with empty data', async () => {
        const useAllTestsMock = jest.requireMock("@/entities/test-operation/hooks/useAllTests");
        jest.spyOn(useAllTestsMock, 'useAllTests').mockReturnValue({
            data: [],
            contentHeader: ["Test name", "Created", "Participants", "Creator", "Actions"],
            status: "success",
            error: null,
            isPlaceholderData: false,
        });

        renderWithClient(<AllTestsPageClient />)

        // const emptyMessage = await screen.findByText((content, elem) =>
        //     elem?.tagName === 'H3' && content.includes('No tests yet')
        // );
        const emptyMessage = await screen.findByRole('heading', { level: 3, name: /No tests yet/i })
        expect(emptyMessage).toBeInTheDocument();

    });


    test('check call times renderRow function', async () => {
        (renderRowVal.renderRow as jest.Mock).mockImplementation(realRenderRow);
        const data = [
            { _id: '1', name: 'CSS' } as any,
            { _id: '2', name: 'HTML' } as any,
        ];
        render(
            <Table
                dataRow={data}
                dataHeader={[]}
                renderHeader={() => null}
                renderRow={renderRowVal.renderRow}
                virtualizer={mockVirtualizer} />
        );

        expect(renderRowVal.renderRow).toHaveBeenCalledTimes(2);
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


    test('check StatusContent render error', async () => {
        const data = [] as any;
        render(
            <StatusContent
                data={data}
                status='error'
                error={'Some Error'}
                renderEmpty={() => <div />}
                renderData={() => <div />} />
        );

        const error = await screen.findByTestId('error');
        expect(error).toBeInTheDocument();
    });


    test('check return properties useAllTests', () => {
        const mockedReturnValue = {
            data: [],
            contentHeader: [],
            status: 'success',
            error: null,
            isPlaceholderData: false,
        };
        const useAllTestsMock = jest.requireMock("@/entities/test-operation/hooks/useAllTests");
        const spy = jest.spyOn(useAllTestsMock, 'useAllTests').mockReturnValue(mockedReturnValue)

        renderWithClient(<AllTestsPageClient />)

        expect(spy).toHaveBeenCalled();  // проверка вызова useAllTests
        expect(spy.mock.results[0].value).toEqual(mockedReturnValue)
        spy.mockRestore();
    });

});
