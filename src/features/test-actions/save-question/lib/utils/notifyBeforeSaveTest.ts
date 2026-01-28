import Swal from 'sweetalert2';


export const notifyBeforeSaveTest = async () => {
    const { value } = await Swal.fire({
        title: "Add test name",
        html: `
        <input id="test-name" class="swal2-input" placeholder="Test name" />
        <input id="creator-name" class="swal2-input" placeholder="Creator name" />
        `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const testName = (document.getElementById('test-name') as HTMLInputElement)?.value;
            const creatorName = (document.getElementById('creator-name') as HTMLInputElement)?.value;

            if (!testName || !creatorName) {
                Swal.showValidationMessage('Both fields are required');
                return;
            }

            return {
                name: testName,
                creator: creatorName,
            };
        },
    });
    return value
}