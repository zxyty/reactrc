/* @flow */
import React, { PureComponent } from "react";
import { IntlProvider } from "react-intl";

import connectWithActions from "../redux/connectWithActions";
import "../../vendor/intl/intl";
import langs from "../i18n/messages";
import { getSettings } from "../directSelectors";

require("../i18n/locale");

class TranslationProvider extends PureComponent {
  render() {
    const { locale, children } = this.props;
    return (
      <IntlProvider
        key={locale}
        locale={locale}
        messages={langs[locale]}
      >
        {children}
      </IntlProvider>
    );
  }
}

export default connectWithActions(state => ({
  locale: getSettings(state).locale
}))(TranslationProvider);
