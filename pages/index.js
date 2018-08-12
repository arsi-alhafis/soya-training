import Head from "next/head";
import React from 'react';
import { createPageWithOIDCAuth, OIDCAuthorize } from '@traveloka/soya-components/ath';
import Home from '../containers/page/Home';
import Layout from "../components/Layout/Layout";

const title = 'Soya - Home';
const heading = 'Home';

const IndexPage = () => (
  <OIDCAuthorize>
    <Layout>
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <h1>{heading}</h1>
        <Home />
      </div>
    </Layout>
  </OIDCAuthorize>
);
export default createPageWithOIDCAuth()(IndexPage);