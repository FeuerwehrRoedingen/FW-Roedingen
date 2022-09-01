import { Theme } from 'next-auth';
import React, { Component } from 'react'

type Props = {
  url: string;
  host: string;
  theme: Theme;
}

type State = {}

export default class EMailComponent extends Component<Props, State> {
  state = {}

  render() {
    const escapedHost = this.props.host.replace(/\./g, "&#8203;.")
    const brandColor = this.props.theme.brandColor || "#346df1"
    const color = {
      background: "#f9f9f9",
      text: "#444",
      mainBackground: "#fff",
      buttonBackground: brandColor,
      buttonBorder: brandColor,
      buttonText: this.props.theme.buttonText || "#fff",
    }
    return (
      <body className="bg-gray-800">
        <table className="bg-gray-700 max-w-[600px] mx-auto my-auto rounded-[10px]"
          width="100%" border={0} cellSpacing="20" cellPadding="0">
          <tr>
            <td align="center" className="px-3 py-0 text-[22px] font-mono text-ral-3000">
              Sign in to <strong>${escapedHost}</strong>
            </td>
          </tr>
          <tr>
            <td align="center" className="px-5 py-0">
              <table border={0} cellSpacing="0" cellPadding="0">
                <tr>
                  <td align="center" className="rounded-md bg-gray-800">
                    <a href="${url}"
                    target="_blank"
                    className="text-[18px] font-mono text-ral-3000 no-underline rounded-md px-3 py-5 font-bold
                             border-x-ral-3000 border-y-ral-3000 border-solid border-x-[1px] border-y-[1px] inline-block"
                    >
                      Sign in
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center"
              className="pt-3 text-base leading-6 font-mono text-ral-1026">
              If you did not request this email you can safely ignore it.
            </td>
          </tr>
        </table>
      </body>
    )
  }
}