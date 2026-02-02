import * as apiModule from '@/entities/test-operation/api/apiService';
import { useAllTests } from '@/entities/test-operation/hooks/useAllTests';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { setUserTestData } from '../../../test/mocks/mockComponents';



export const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 0,
            },
        },
    });


export const createWrapper = () => {
    const client = createTestQueryClient();

    function QueryClientTestWrapper({ children }: { children: React.ReactNode }) {
        return (
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        );
    }

    return QueryClientTestWrapper;
};


describe('useAllTest test', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('setUserTestData is called in useEffect when the data changes.', async () => {
        jest.spyOn(apiModule.api, 'get').mockResolvedValue([
            { _id: "1", name: 'CSS' }
        ]);

        renderHook(() => useAllTests(), {
            wrapper: createWrapper()
        })

        await waitFor(() => {
            expect(setUserTestData).toHaveBeenCalledTimes(1);
            expect(setUserTestData).toHaveBeenCalledWith([{ _id: '1', name: 'CSS' }]);
        });
    });


    test('Check that the params are correctly handled (useSearchParams()).', async () => {
        jest.spyOn(apiModule.api, 'get').mockResolvedValue([
            { _id: "1", name: 'React' }
        ]);

        const { result } = renderHook(() => useAllTests(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            expect(result.current.data).toEqual([{ _id: "1", name: 'React' }]);
            expect(apiModule.api.get).toHaveBeenCalledWith('/test/get?q=React', expect.anything())
        });
    });


    test('Api called with correct URL. without params', async () => {

        const apiSpy = jest.spyOn(apiModule.api, 'get').mockResolvedValue([
            { _id: "1", name: 'React' }
        ]);

        // Изолирования и переопределение global mock next/navigation
        jest.isolateModules(async () => {

            jest.doMock('next/navigation', () => ({
                useRouter: () => ({
                    push: jest.fn(),
                    replace: jest.fn(),
                    pathname: '/',
                    query: {},
                }),
                useSearchParams: () => ({
                    get: () => ''
                }),
                usePathname: () => '/'
            }));

            const useAllTests = await import('@/entities/test-operation/hooks/useAllTests').then(m => m.useAllTests)

            renderHook(() => useAllTests(), {
                wrapper: createWrapper()
            });

            await waitFor(() => {
                expect(apiSpy).toHaveBeenCalledTimes(1);
                expect(apiSpy).toHaveBeenCalledWith('/test/get?q=', expect.anything())
            });

            apiSpy.mockRestore();
        });
    });


    test('Ensure that the useAllTests does not trigger an API with (enabled: !!id).', async () => {

        jest.isolateModules(async () => {
            jest.doMock('@/features/auth/login/model/store', () => ({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                useLoginForm: (selector?: any) => {
                    const state = {
                        setUserTestData,
                        userData: { id: '' }
                    }
                    return selector ? selector(state) : state
                }

            }));
            const apiSpy = jest.spyOn(apiModule.api, 'get')
            const useAllTests = await import('@/entities/test-operation/hooks/useAllTests').then(m => m.useAllTests)
            renderHook(() => useAllTests(), {
                wrapper: createWrapper()
            });
            await waitFor(() => {
                expect(apiSpy).not.toHaveBeenCalled();
            });

            apiSpy.mockRestore();
        });
    });

});
