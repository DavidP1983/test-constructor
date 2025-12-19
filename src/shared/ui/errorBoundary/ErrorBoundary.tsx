"use client";
import { Component } from "react";
import { ErrorPage } from "../error/ErrorPage";


interface Props {
    children?: React.ReactNode
}

class ErrorBoundary extends Component<Props> {

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({ error: true });
    }

    render() {

        const errorMessage = this.state.error
            ?
            <div>
                <ErrorPage error="Opps... something went wrong" />
            </div>
            :
            this.props.children;
        return (
            <>
                {errorMessage}
            </>
        )
    }
}

export default ErrorBoundary;