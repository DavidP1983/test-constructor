import { TableActions } from '@/features/table-actions/ui/TableActions';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockDelete, pushMethod } from '../../../test/mocks/mockComponents';


const mockCreateLink = jest.fn();
jest.mock('@/entities/test-operation/hooks/useCreateAccessesLink', () => ({
    useCreateAccessesLink: () => ({
        handleCreateLink: mockCreateLink
    })
}));


describe('TableActions unit tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('render TableActions component with 3 buttons', () => {

        render(<TableActions testId='123' />);

        const buttons = document.querySelectorAll('button');
        const btnAttr = ['Link', 'Edit', 'Delete'];
        buttons.forEach((item, i) => {
            expect(item.getAttribute('data-btn')).toBe(btnAttr[i])
        })
        expect(buttons).toHaveLength(3);

    });

    test('Should call handleCreateLink with testId on click', async () => {
        render(<TableActions testId='123' />);


        const btnCreateLink = screen.getByLabelText('link-icon');
        await userEvent.click(btnCreateLink)

        expect(mockCreateLink).toHaveBeenCalledWith('123');
        expect(mockCreateLink).toHaveBeenCalledTimes(1);
    });


    test('Should navigate via router.push on click', async () => {
        render(<TableActions testId='123' />);

        const btnEdit = screen.getByLabelText('edit-icon');
        await userEvent.click(btnEdit);

        expect(pushMethod).toHaveBeenCalledWith(`builder/123?mode=edit`);
        expect(pushMethod).toHaveBeenCalledTimes(1);
    });


    test('Should call handleDelete with testId on click', async () => {
        render(<TableActions testId='123' />);

        const btnEdit = screen.getByLabelText('trash-icon');
        await userEvent.click(btnEdit);

        expect(mockDelete).toHaveBeenCalledWith('123');
        expect(mockDelete).toHaveBeenCalledTimes(1);
    });

});