/* @flow */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { IntlProvider, injectIntl } from "react-intl";
import { connect } from "react-redux";
import langs from "../i18n/messages";
import { getSettings } from "../directSelectors";
require("../i18n/locale");

@connect(state => ({ settings: getSettings(state) }))
export default class TranslationProvider extends PureComponent {
  render() {
    const {
      children,
      settings: { locale },
    } = this.props;
    return (
      <IntlProvider key={locale} locale={locale} messages={langs[locale]}>
        {/* {children} */}
        <InjectIntlComponentC>{children}</InjectIntlComponentC>
      </IntlProvider>
    );
  }
}

class InjectIntlComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.intl = this.props.intl;
  }
  getChildContext() {
    return {
      intl: this.intl,
    };
  }

  static childContextTypes = {
    intl: PropTypes.shape({}),
  };

  render() {
    return this.props.children;
  }
}

const InjectIntlComponentC = injectIntl(InjectIntlComponent);
