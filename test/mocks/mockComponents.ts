/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";


// --- LIBRARIES --- //

// Mock Motion library
jest.mock('motion/react', () => ({
    motion: {
        create:
            (Component: React.ComponentType<any>) =>
                (props: any) =>
                    React.createElement(Component, props),
        h1: (props: any) => React.createElement('h1', props),
        div: (props: any) => {
            // Исключил layout, избегая ошибки
            const { layout, ...rest } = props;
            return React.createElement('div', rest)
        }
    },
}));


// Mock Swal library
jest.mock('@/shared/utils/notify', () => ({
    notify: jest.fn()
}));

// Mock uuid
jest.mock('uuid', () => ({
    __esModule: true,
    v4: () => 'test-uuid',
}));



// --- HOOKS --- //

// Mock Hook useDeleteTest 
export const mockDelete = jest.fn();
jest.mock('@/entities/test-operation/hooks/useDeleteTest', () => ({
    useDeleteTest: () => ({
        mutate: jest.fn(),
        isPending: false,
        handleDelete: mockDelete
    }),
}));


// Mock Hook useHeader
export const handleClickMock = jest.fn();
export const handleLogoutMock = jest.fn();
export const toggleSwitchMock = jest.fn();
jest.mock('@/widgets/header/model/useHeader', () => ({
    useHeader: jest.fn(() => ({
        myRef: { current: null },
        isOpenMenu: false,
        userData: { id: 'mock-id', name: 'Tony' },
        setTheme: jest.fn(),
        handleClick: handleClickMock,
        handleLogout: handleLogoutMock,
        toggleSwitch: toggleSwitchMock,
        isOn: false,
    }))
}));


// --- FUNCTIONS --- //

// Mock function renderRow
jest.mock('@/widgets/table-row/ui/renderRow', () => ({
    renderRow: jest.fn(),
}));



//  --- STORE --- // 


// Mock useTest store
jest.mock('@/features/test-actions/save-question/model/store', () => ({
    useTest: () => ({
        resetTotalCreatedTests: jest.fn(),
    }),
}));


// Mock useLoginForm store
export const setUserTestData = jest.fn();
jest.mock('@/features/auth/login/model/store', () => ({
    useLoginForm: (selector?: any) => {
        const state = {
            setUserTestData,
            userData: { id: 'mock-id', name: 'Tony' }
        }
        return selector ? selector(state) : state
    }
}));


// Mock useCompletedTestsStore store
export const calculateCompletedTestsMock = jest.fn();
export const registerCompletedTestMock = jest.fn();
jest.mock('@/widgets/test-pass/model/store', () => ({
    useCompletedTestsStore: (selector?: any) => {
        const state = {
            calculateCompletedTests: calculateCompletedTestsMock,
            registerCompletedTest: registerCompletedTestMock,
            totalCompletedTests: "1",
        }
        return selector ? selector(state) : state
    }
}));



//  --- NEXT FEATURES --- //


// Mock next/Link
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: any) =>
        React.createElement('a', { href }, children),
}));


// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        const { src, alt, width, height, onClick, loading } = props;
        return React.createElement('img', { src, alt, width, height, onClick, loading })
    }
}));


// Mock next/navigation
export const pushMethod = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: pushMethod,
        replace: jest.fn(),
        pathname: '/',
        query: {},
    }),
    useSearchParams: () => ({ get: (key: string) => (key === 'q' ? 'React' : null) }),
    usePathname: () => '/'
}));

