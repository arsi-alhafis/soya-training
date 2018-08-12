import React from 'react';
import { Icon, NotificationContainer } from "@traveloka/soya-components";
import { OIDCLayout } from '@traveloka/soya-components/ath';
import Link from 'next/link'
import "@traveloka/soya-components/styles";
import Head from "next/head";

const getNavBarMenus = () => [
  {
    title: "Soya",
    iconText: <Icon icon="home" />,
    links: [
      <Link href="/">
        <a>
          <Icon icon="dashboard" /> Dashboard
        </a>
      </Link>
    ]
  },
  {
    title: "Master",
    iconText: <Icon icon="apps" />,
    links: [
      <Link href="/currencies">
        <a>
          <Icon icon="local-atm" /> Currencies
        </a>
      </Link>,
      <Link href="/settings">
        <a>
          <Icon icon="settings" /> Settings
        </a>
      </Link>
    ]
  }
];

export default ({ children }) => (
  <OIDCLayout menuData={getNavBarMenus()}>
    <Head>
      <link rel="shortcut icon" href="/static/favicon.ico" />
    </Head>
    <NotificationContainer />
    {children}
  </OIDCLayout>
);
