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

jest.mock('@/shared/utils/notifyDuringOperation', () => ({
    notifyDuringOperation: jest.fn()
}));

jest.mock('@/features/profile/user-security/lib/notifyForm', () => ({
    notifyForm: jest.fn()
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

// Mock Hook useDeleteCompletedTest 
export const mockDeleteCompleted = jest.fn();
jest.mock('@/entities/test-operation/hooks/useDeleteCompletedTest', () => ({
    useDeleteCompletedTest: () => ({
        handleDeleteCompletedTest: mockDeleteCompleted
    })
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


// Mock Hook useAvatar
export const handleChangeMock = jest.fn();
export const clearAvatarMock = jest.fn();
jest.mock('@/entities/profile-info/model/useAvatar', () => ({
    useAvatar: jest.fn(() => ({
        handleChange: handleChangeMock,
        clearAvatar: clearAvatarMock,
        isUploading: false
    }))
}));



// --- FUNCTIONS --- //

// Mock function renderRow
jest.mock('@/widgets/table-row/ui/renderRow', () => ({
    renderRow: jest.fn(),
}));


jest.mock('@/widgets/table-row/ui/renderRowCompleted', () => ({
    renderRowCompleted: jest.fn()
}));


jest.mock('@/entities/table/ui/table-row/completedTestRow', () => ({
    completedTestRow: jest.fn()
}));



//  --- STORE --- // 

// Mock useTest store
export const defaultUseTestState = {
    totalCreatedTests: 1,
    resetTotalCreatedTests: jest.fn()
}

jest.mock('@/features/test-actions/save-question/model/store', () => ({
    useTest: jest.fn((selector?: any) => {
        return selector ? selector(defaultUseTestState) : defaultUseTestState
    })
}));


// Mock useLoginForm store
export const setUserTestData = jest.fn();
jest.mock('@/features/auth/login/model/store', () => ({
    useLoginForm: (selector?: any) => {
        const state = {
            setUserTestData,
            userTestData: [
                { _id: '1', name: 'CSS' } as any,
                { _id: '2', name: 'HTML' } as any,
            ],
            userData: {
                id: 'mock-id',
                name: 'Tony',
                email: 'tony@gmail.com',
                role: 'User',
                joined: '2026-02-03'
            }
        }
        return selector ? selector(state) : state
    }
}));



// Mock useCompletedTestsStore store
export const calculateCompletedTestsMock = jest.fn();
export const registerCompletedTestMock = jest.fn();
export const resetCompletedTestsCountMock = jest.fn();

export const defaultState = {
    calculateCompletedTests: calculateCompletedTestsMock,
    registerCompletedTest: registerCompletedTestMock,
    resetCompletedTestsCount: resetCompletedTestsCountMock,
    viewedTests: ['1'],
    totalCompletedTests: "1",
    completedTestsToken: ['1']
};

jest.mock('@/widgets/test-pass/model/store', () => ({
    // Делаем mock данного store jest.fn((selector?: any)
    useCompletedTestsStore: jest.fn((selector?: any) => {

        return selector ? selector(defaultState) : defaultState
    })
}));


// Mock userProfile store
export const defaultUserProfileStore = {
    avatarUrl: 'some url',
    setAvatar: jest.fn()
}
jest.mock('@/entities/profile-info/model/store', () => ({
    useProfile: jest.fn((selector?: any) => {

        return selector ? selector(defaultUserProfileStore) : defaultUserProfileStore
    })
}));

//  --- NEXT FEATURES --- //


// Mock next/Link
jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: any) =>
        React.createElement('a', { href }, children),
}));


// Mock next-themes
export const setThemeMock = jest.fn();
jest.mock('next-themes', () => ({
    __esModule: true,
    useTheme: () => ({
        setTheme: setThemeMock
    })
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

