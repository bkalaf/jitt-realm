import React from 'react';
import { ErrorInfo } from 'react';


export default class ErrorBoundary extends React.Component<
    // eslint-disable-next-line @typescript-eslint/ban-types
    {},
    { hasError: boolean; error?: Error; errorInfo?: ErrorInfo }
> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
        
    }
    override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        process.stderr.write(`ERROR: ${error.name}\n\tMESSAGE: ${error.message}\n\tSTACK: ${error.stack ? error.stack : ''}\n`);
        this.setState({
            hasError: true,
            error,
            errorInfo
        });
    }
    render() {
        return this.state.hasError ? (
            <div>
                <header>Exception in React Component Tree</header>
                <hr />
                <div>{this.state.error?.name}</div>
                <div>{this.state.error?.message}</div>
                <div>{this.state.errorInfo?.componentStack}</div>
            </div>
        ) : (
            this.props.children
        );
    }
}
