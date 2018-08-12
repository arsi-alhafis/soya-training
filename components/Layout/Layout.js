import React from 'react';
import { Icon } from "@traveloka/soya-components";
import { OIDCLayout } from '@traveloka/soya-components/ath';
import Link from 'next/link'
import "@traveloka/soya-components/styles";

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
      <Link href="/setting">
        <a>
          <Icon icon="settings" /> Setting
        </a>
      </Link>
    ]
  }
];

export default ({ children }) => (
  <OIDCLayout menuData={getNavBarMenus()}>
    {children}
  </OIDCLayout>
);
