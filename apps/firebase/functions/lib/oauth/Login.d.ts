import { ChangeEvent, Component } from 'react';
/**************************************************************************************************
 *    ___                   __     ___                                                            *
 *   / _ \ ___  ___   ___  / /_   / _ \ ___   ___   ___                                           *
 *  / , _// -_)/ _ `// __// __/  / ___// _ `// _ `// -_)                                          *
 * /_/|_| \__/ \_,_/ \__/ \__/  /_/    \_,_/ \_, / \__/                                           *
 *                                          /___/                                                 *
 **************************************************************************************************/
/** */
declare type Props = {
    version_number: string;
};
declare type State = {
    client_id: string | null;
    redirect: string | null;
    redirect_uri: string | null;
    usernameInput: string;
    passwordInput: string;
    showPassword: boolean;
    version: string;
};
export declare class Login extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onTogglePassword: () => void;
    onSubmit: () => Promise<void>;
    render(): JSX.Element;
}
export {};
