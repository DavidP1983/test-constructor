/* eslint-disable @typescript-eslint/no-empty-object-type */
import { CompletedTest } from "@/shared/types/completed-type";


interface TemplateProps extends Pick<
    CompletedTest,
    | 'candidateName'
    | 'candidateEmail'
    | 'testName'
    | 'status'
    | 'score'
    | 'correctAnswers'
    | 'totalQuestions'
    | 'completedAt'> { }

export const createPdfTemplate = (completedTest: TemplateProps) => {

    const isNotUndefinedValue = Object.values(completedTest).some(value => value === undefined);

    if (isNotUndefinedValue) {
        return '';
    }

    const {
        candidateName,
        candidateEmail,
        testName,
        status,
        score,
        correctAnswers,
        totalQuestions,
        completedAt
    } = completedTest;

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f6f9;
            padding: 40px;
        }

        .card {
            max-width: 700px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            padding: 30px 40px;
        }

        .title {
            text-align: center;
            font-size: 26px;
            margin-bottom: 25px;
            color: #2c3e50;
        }

        .status {
            font-weight: bold;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 14px;
            display: inline-block;
        }

        .passed {
            background-color: #e6f9f0;
            color: #1e8449;
        }

        .failed {
            background-color: #fdecea;
            color: #c0392b;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
            font-size: 15px;
        }

        li:last-child {
            border-bottom: none;
        }

        .label {
            font-weight: 600;
            color: #555;
        }

        .value {
            color: #2c3e50;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 13px;
            color: #888;
        }
        </style>
        </head>

        <body>
        <div class="card">
            <div class="title">Test Summary</div>

            <ul>
            <li>
                <span class="label">Candidate</span>
                <span class="value">${candidateName}</span>
            </li>

            <li>
                <span class="label">Candidate Email</span>
                <span class="value">${candidateEmail}</span>
            </li>

            <li>
                <span class="label">Test</span>
                <span class="value">${testName}</span>
            </li>

            <li>
                <span class="label">Status</span>
                <span class="status ${status === "passed" ? "passed" : "failed"}">
                ${status === "passed" ? "PASSED ✅" : "FAILED ❌"}
                </span>
            </li>

            <li>
                <span class="label">Score</span>
                <span class="value">${score}%</span>
            </li>

            <li>
                <span class="label">Correct Answers</span>
                <span class="value">${correctAnswers} / ${totalQuestions}</span>
            </li>

            <li>
                <span class="label">Completed</span>
                <span class="value">${completedAt}</span>
            </li>
            </ul>

            <div class="footer">
            Generated automatically by Test Constructor System
            </div>
        </div>
        </body>
        </html>
    `;

    return html
}