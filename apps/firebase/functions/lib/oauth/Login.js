import React, { Component } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { FaEye, FaEyeSlash } from 'react-icons/fa/index.js';
import { ToastContainer, toast } from 'react-toastify';
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Query params
            client_id: null,
            redirect: null,
            redirect_uri: null,
            // State
            usernameInput: '',
            passwordInput: '',
            showPassword: false,
            // Version Infered from invisible <a>
            version: ''
        };
    }
    // get the query parameters after the component has been mounted to the DOM
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const version = document.getElementById('version_number')?.className;
        this.setState({
            client_id: urlParams.get('client_id'),
            redirect: urlParams.get('redirect'),
            redirect_uri: urlParams.get('redirect_uri'),
            version
        });
    }
    onUsernameChange = (event) => {
        this.setState({ usernameInput: event.target.value });
    };
    onPasswordChange = (event) => {
        this.setState({ passwordInput: event.target.value });
    };
    onTogglePassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };
    onSubmit = async () => {
        const id = toast.loading('Prüfe Anmeldedaten', {
            position: 'top-right',
            theme: 'dark',
            isLoading: true,
            draggable: true,
            pauseOnHover: true
        });
        function fetchLogin(username, password, redirect, redirect_uri, client_id) {
            return new Promise(async function (resolve, reject) {
                setTimeout(() => reject(), 5000);
                const result = await fetch('/oauth/authorize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        redirect,
                        redirect_uri,
                        client_id
                    })
                });
                console.log(result);
                resolve(result.ok);
            });
        }
        try {
            const result = await fetchLogin(this.state.usernameInput, this.state.passwordInput, this.state.redirect, this.state.redirect_uri, this.state.client_id);
            setTimeout(() => {
                if (result) {
                    toast.update(id, {
                        position: 'top-right',
                        theme: 'dark',
                        isLoading: false,
                        draggable: true,
                        pauseOnHover: true,
                        type: 'success',
                        render: 'Willkommen',
                        autoClose: 2000
                    });
                }
                else {
                    toast.update(id, {
                        position: 'top-right',
                        theme: 'dark',
                        isLoading: false,
                        draggable: true,
                        pauseOnHover: true,
                        type: 'error',
                        render: 'Benutzername/Passwort inkorrekt',
                        autoClose: 2000
                    });
                }
            }, 1000);
        }
        catch (error) {
            toast.update(id, {
                position: 'top-right',
                theme: 'dark',
                isLoading: false,
                draggable: true,
                pauseOnHover: true,
                type: 'warning',
                render: 'Timeout',
                autoClose: 5000
            });
        }
    };
    render() {
        const icon = this.state.showPassword ?
            React.createElement(FaEyeSlash, { onClick: this.onTogglePassword, className: 'icon', size: '25px' }) :
            React.createElement(FaEye, { onClick: this.onTogglePassword, className: 'icon', size: '25px' });
        return (React.createElement("div", { className: 'page' },
            React.createElement("div", { className: 'container' },
                React.createElement("div", { className: 'top' },
                    React.createElement("img", { src: '/img/Logo.png', className: 'logo' }),
                    React.createElement("a", null, "Feuerwehr R\u00F6dingen")),
                React.createElement("div", { className: 'inputs' },
                    React.createElement("input", { placeholder: 'Username', value: this.state.usernameInput, onChange: this.onUsernameChange, type: 'text' }),
                    React.createElement("div", { className: 'passwordContainer' },
                        React.createElement("input", { placeholder: 'Password', value: this.state.passwordInput, onChange: this.onPasswordChange, type: this.state.showPassword ? 'text' : 'password' }),
                        icon)),
                React.createElement("div", { className: 'bottom' },
                    React.createElement("a", null,
                        "version: ",
                        this.state.version),
                    React.createElement("button", { onClick: this.onSubmit, className: 'submitButton' }, "Anmelden"))),
            React.createElement(ToastContainer, null)));
    }
}
/**************************************************************************************************
 *    __ __          __            __   _
 *   / // / _ __ ___/ /______ _   / /_ (_) __   ___
 *  / _  // // // _  // __// _ `// __// // _ \ / _ \
 * /_//_/ \_, / \_,_//_/   \_,_/ \__//_/ \___//_//_/
 *       /___/
 **************************************************************************************************/
if (typeof window !== 'undefined') {
    const root = document.getElementById('root');
    if (root === null) {
        alert('Error hydrating page, root Div not found');
    }
    else {
        ReactDOMClient.hydrateRoot(root, React.createElement(Login));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTG9naW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxFQUFFLEVBQWUsU0FBUyxFQUFFLE1BQU0sT0FBTyxDQUFBO0FBQ3JELE9BQU8sS0FBSyxjQUFjLE1BQU0sa0JBQWtCLENBQUE7QUFDbEQsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBMEJ0RCxNQUFNLE9BQU8sS0FBTSxTQUFRLFNBQXVCO0lBQ2hELFlBQVksS0FBWTtRQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsZUFBZTtZQUNmLFNBQVMsRUFBSyxJQUFJO1lBQ2xCLFFBQVEsRUFBTSxJQUFJO1lBQ2xCLFlBQVksRUFBRSxJQUFJO1lBRWxCLFFBQVE7WUFDUixhQUFhLEVBQUUsRUFBRTtZQUNqQixhQUFhLEVBQUUsRUFBRTtZQUNqQixZQUFZLEVBQUUsS0FBSztZQUVuQixxQ0FBcUM7WUFDckMsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO0lBQ0osQ0FBQztJQUVELDJFQUEyRTtJQUMzRSxpQkFBaUI7UUFDZixNQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxTQUFVLENBQUM7UUFFdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNaLFNBQVMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUNyQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDbkMsWUFBWSxFQUFFLFNBQVMs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