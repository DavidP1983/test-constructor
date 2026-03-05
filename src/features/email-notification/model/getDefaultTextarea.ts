
export const getDefaultTextarea = (testName: string | undefined, status: 'passed' | 'failed') => {

    const messageToCandidate = {
        passed: `Congratulations! You have successfully passed the ${testName ?? ''} test.\n  
                Our team will contact you shortly with the next steps.\n 
                You can review the details of your test results below.\n  
                If you don’t see your test results, please let us know and we will send you the PDF report.\n 

                We’re excited about your progress and look forward to connecting with you soon!`,

        failed: `Thank you for taking the ${testName ?? ''} test.\n
                 Unfortunately, you did not pass the test this time. We truly appreciate the time and effort you invested in completing the assessment.\n 
                You can review the details of your test results below.\n 
                If you don’t see your test results, please let us know and we will send you the PDF report.`
    }

    return messageToCandidate[status]
}