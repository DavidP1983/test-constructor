
export const getDefaultTextarea = (testName: string | undefined, status: 'passed' | 'failed') => {

    const messageToCandidate = {
        passed: [
            `Congratulations! You have successfully passed the ${testName ?? ''} test.`,
            `Our team will contact you shortly with the next steps.`,
            `You can review the details of your test results below.`,
            `If you don’t see your test results, please let us know and we will send you the PDF report.`,
            `We’re excited about your progress and look forward to connecting with you soon!`
        ].join('\n\n'),

        failed: [
            `Thank you for taking the ${testName ?? ''} test.`,
            `Unfortunately, you did not pass the test this time. We truly appreciate the time and effort you invested in completing the assessment.`,
            `You can review the details of your test results below.`,
            `If you don’t see your test results, please let us know and we will send you the PDF report.`
        ].join('\n\n')
    }

    return messageToCandidate[status]
}