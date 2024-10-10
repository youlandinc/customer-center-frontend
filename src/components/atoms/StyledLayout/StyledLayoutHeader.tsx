'use client';
import { FC, ReactNode, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  Avatar,
  Icon,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { URL_DOC, URL_HOME, URL_LOS, URL_POS, URL_PRICING } from './index';
import { useSwitch } from '@/hooks';

import { StyledButton, StyledDialog } from '@/components/atoms';

import LOGO_PRODUCT_BOX from './assets/logo_product_box.svg';
import LOGO_PRODUCT_HOME from './assets/logo_product_home.svg';
import LOGO_PRODUCT_POS from './assets/logo_product_pos.svg';
import LOGO_PRODUCT_LOS from './assets/logo_product_los.svg';
import LOGO_PRODUCT_DOC from './assets/logo_product_doc.svg';
import LOGO_PRODUCT_PRICE from './assets/logo_product_price.svg';
import LOGO_PRODUCT_SERVING from './assets/logo_product_serving.svg';
import LOGO_PRODUCT_CUSTOMER from './assets/logo_product_customer.svg';

//import LOGO_HEADER_POS from './assets/logo_header_pos.svg';
//import LOGO_HEADER_LOS from './assets/logo_header_los.svg';
//import LOGO_HEADER_DOC from './assets/logo_header_doc.svg';
//import LOGO_HEADER_PRICE from './assets/logo_header_price.svg';
//import LOGO_HEADER_SERVING from './assets/logo_header_serving.svg';
import LOGO_HEADER_CUSTOMER from './assets/logo_header_customer.svg';
import LOGO_HEADER_SETTING from './assets/logo_header_setting.svg';

import LOGO_SETTING from './assets/logo_auth_setting.svg';
import LOGO_SIGN_OUT from './assets/logo_auth_out.svg';

export interface LayoutHeaderProps {
  isHomepage: boolean;
  actions?: ReactNode;
}

const session = {
  accessToken: {
    jwtToken:
      'eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoie1wiaWRcIjpcIjEwMDAwMjIwMjMwMzIzMDAwMDA2NDBcIixcInVzZXJJbmZvXCI6e1widXNlcklkXCI6XCIxMDAwMDIyMDIzMDMyMzAwMDAwNjQwXCIsXCJ0ZW5hbnRJZFwiOlwiMTAwMDA1MjAyMjA5MjgwMDAwMDEwMlwiLFwib3JnYW5pemF0aW9uTmFtZVwiOm51bGwsXCJjb21wYW55TmFtZVwiOm51bGwsXCJjaGFubmVsSWRcIjpcIjEwMDAwNTIwMjIwOTI4MDAwMDAxMDJcIixcImFwcElkXCI6XCIxMDAwMDUyMDIyMDkyODAwMDAwNzAyXCIsXCJuYW1lXCI6XCJtYWNlICBndW9cIixcImZpcnN0TmFtZVwiOlwibWFjZSBcIixcImxhc3ROYW1lXCI6XCJndW9cIixcInBob25lXCI6XCI5ODkwODkwODkwXCIsXCJiaXJ0aERheVwiOm51bGwsXCJhdmF0YXJcIjpcImh0dHBzOi8veW91bGFuZC1jb21tb24taW1hZ2VzLnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL2hvbWVfYnV5ZXJfYWxlcnRfcGljXzQyMjAzMTEzMjcucG5nXCIsXCJiYWNrZ3JvdW5kQ29sb3JcIjpcIiM0NDMwMjRcIixcImFjY291bnRJZFwiOlwiMTAwMDAyMjAyMzAzMjMwMDAwMDY0MFwiLFwib3BlcmF0ZVVzZXJJZFwiOm51bGwsXCJhY2NvdW50XCI6XCJtYWNlQHlvdWxhbmQuY29tXCIsXCJyb2xlTmFtZVwiOlwiQURNSU5cIixcImVtYWlsXCI6XCJtYWNlQHlvdWxhbmQuY29tXCIsXCJhZGRyZXNzXCI6bnVsbCxcImFjY291bnRUeXBlXCI6XCJTWVNNTkdcIixcInNvdXJjZVwiOjQsXCJwb3NEb21haW5VcmxcIjpudWxsLFwibG9naW5UeXBlXCI6XCJZTEFDQ09VTlRfTE9HSU5cIixcIndoaXRlTGFiZWxcIjpmYWxzZX0sXCJleHBpcmF0aW9uXCI6XCIyMDI0LTEwLTExVDAyOjQ2OjA4LjY1OTQzNjM2M1wifSIsImp0aSI6Ik1ERXdNMkptWXpNdE56WmxaUzAwTldSaUxUazFPVEF0TldZMk5EUm1NVGczTWpsbCIsImV4cCI6MTcyODYxNDc2OH0.jMDMNLKBzRJwg4sIU-1BIEn6BJSdWVPgHidD2bxZKOGDyg-ppEfKAZ-v1ItfyrRVVp6ngdO9TZqNfr8radOxdZyUnRuyn3tIW63ptrFQz_M4CsvSyRXAIV4T_BDJTOo5lvElO3IxgVrdbIvumgefmbQCbKGryGHbGKJkWVvdPCSBRfC3KD1Ua6zeuCg5nrdfET2d3j655cfPvMbn4NhPMp25qR44AApRAJz-yapb-ckx-SlDeJfaZ58h3xwQ6hITSBUJNxRLteeHCZZzcIziWLWOt9XCw9njr05T5uMYChX4SOnf-Abau09jrcZ4YqavQhxZMOhgLXas8KbHhWCYKA@jcDlAFZpmslrRYwUzfpP@1000052022092800000102',
  },
};

const setting = {
  id: '1000022023032300000640',
  tenantId: '1000052022092800000102',
  appId: '1000052022092800000702',
  account: 'mace@youland.com',
  channel: null,
  userId: '1000022023032300000640',
  userName: 'mace@youland.com',
  role: 'ADMIN',
  accountType: 'SYSMNG',
  loginType: 'YLACCOUNT_LOGIN',
  source: null,
  parentAccountId: '1000022023011200000599',
  userInfo: {
    isFinished: false,
    firstName: 'mace ',
    lastName: 'guo',
    name: 'mace@youland.com',
    birthDay: null,
    gender: null,
    maritalStatus: null,
    age: null,
    email: 'mace@youland.com',
    phone: '9890890890',
    ssn: null,
    companyName: null,
    title: null,
    avatar:
      'https://youland-common-images.s3.us-west-1.amazonaws.com/home_buyer_alert_pic_4220311327.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMSJIMEYCIQDrDAzWcVRTQw2THTkKEMgWGzBJKvIF9bkeOAWvxPzNZwIhANMyiB6HndtoXVxIVfrFrK9pemiVWw4jj9Iyp9aRPeHZKoUECGkQAhoMMzQ4MTUyMDMzNjgxIgycLduNapKtSkGO%2F5gq4gPV2w%2B4WYlJZIZzieL1OPKlkhrsX%2F1z%2BDUBDXn9qi5wpj0MYb4gvchUkDyDoHTxnbFFufgbidNRyaMDe6Oi3J3024NKSWoEGel0GV6R%2BPi2U%2Bk%2BL8JI8PeriX1JzsurzQ9tWkxsXH0fB1gPR%2FjDqCDQpH2UsgMwK37wtaan0g4TNUQLuc0U52rPq6%2FBvqDRYUYMJMYnY1KzIEyAz1wKtD45TLSNwsUibrW4kJoKMPPwhqIIgc6s6y2EdyXNSBG1ZV0Ji9X8bl10Un7mGIY26JaEuvtLs7jtUnCtlFXIO5M3f863jXalJzZWVFXLFR%2BV%2FmS1cfhP%2BE%2FG4FreKJn2oG4xh4r%2Bk3AO4JkcZbSh%2FMbpBKXDhomHArJ8HftsYfvGmb%2FitECvtBv2GRIz6VueDmqw9yibPPOHuZNfhoOAKdRpua%2B%2B%2FYERBQgx8Z2i4qLFHzeGbwLteiKttRDBQD0iPa0X9OYxyNLRZRAo9lx%2BTDz%2FoL0k7MH2jgLYddj8%2B%2FLUrIVZZtGa6GtYQOO%2FKSy88sE58i4M8nBtijews6HLyqIT0%2B3dG53gBSkkx%2BOJ6muyEcNX%2Blev%2Fk421TijDmG5ourHBNt45mpgg86NLOtmfWh3joGPIDrdQRsK4fBkW9YEjWOWmzCjp5y4BjqkAX2izlKCERG%2BxWyipsScn9VhR6yLde%2BrdLfjMV1uyUaBa%2Bgp5%2FZp%2FY0O8sA%2FX4w3%2BIBg5CfWWpH2EDnqve7FnCpwrmJVBasuvujGwaCw6pCedTl%2BbrCP%2F3G6BUJf%2BUj5qu0O9rkwJlptZBgSwPMO%2Bj5nUpK8AgJYyqmmhgvTpc5rS%2FzkUG%2F6Dkq8FYn0Rh1cm6RdaBzmllVHWSsp3oLXZ57r1DKe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241010T024609Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAVCD32OGIVZ5FHKZU%2F20241010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=4ff8709033e4880bd83b48488b4dbe1dfdcbab1a795bc09d2abfc40e265e5cbf',
    position: null,
    addressInfo: null,
    residencyStatus: null,
    backgroundColor: '#443024',
    profile: null,
    formConfig: {
      option: true,
      skipNull: false,
    },
  },
  inviteCode: null,
  lastLoginTime: '2024-10-10T02:46:02.267872Z',
  paymentMethod: null,
  billingAddress: null,
  notificationRule: null,
  referrers: null,
  extInfo: null,
  enabled: 1,
  roles: [
    {
      id: 1,
      tenantId: '1000052022092800000102',
      name: 'Admin',
      rolePermissions: null,
      description: 'Admin',
      extInfo: null,
      accountList: null,
    },
  ],
  tenantConfig: {
    id: 2,
    tenantId: '1000052022092800000102',
    logoUrl:
      'https://youland-common-images.s3.us-west-1.amazonaws.com/_1695312210.svg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMSJIMEYCIQDrDAzWcVRTQw2THTkKEMgWGzBJKvIF9bkeOAWvxPzNZwIhANMyiB6HndtoXVxIVfrFrK9pemiVWw4jj9Iyp9aRPeHZKoUECGkQAhoMMzQ4MTUyMDMzNjgxIgycLduNapKtSkGO%2F5gq4gPV2w%2B4WYlJZIZzieL1OPKlkhrsX%2F1z%2BDUBDXn9qi5wpj0MYb4gvchUkDyDoHTxnbFFufgbidNRyaMDe6Oi3J3024NKSWoEGel0GV6R%2BPi2U%2Bk%2BL8JI8PeriX1JzsurzQ9tWkxsXH0fB1gPR%2FjDqCDQpH2UsgMwK37wtaan0g4TNUQLuc0U52rPq6%2FBvqDRYUYMJMYnY1KzIEyAz1wKtD45TLSNwsUibrW4kJoKMPPwhqIIgc6s6y2EdyXNSBG1ZV0Ji9X8bl10Un7mGIY26JaEuvtLs7jtUnCtlFXIO5M3f863jXalJzZWVFXLFR%2BV%2FmS1cfhP%2BE%2FG4FreKJn2oG4xh4r%2Bk3AO4JkcZbSh%2FMbpBKXDhomHArJ8HftsYfvGmb%2FitECvtBv2GRIz6VueDmqw9yibPPOHuZNfhoOAKdRpua%2B%2B%2FYERBQgx8Z2i4qLFHzeGbwLteiKttRDBQD0iPa0X9OYxyNLRZRAo9lx%2BTDz%2FoL0k7MH2jgLYddj8%2B%2FLUrIVZZtGa6GtYQOO%2FKSy88sE58i4M8nBtijews6HLyqIT0%2B3dG53gBSkkx%2BOJ6muyEcNX%2Blev%2Fk421TijDmG5ourHBNt45mpgg86NLOtmfWh3joGPIDrdQRsK4fBkW9YEjWOWmzCjp5y4BjqkAX2izlKCERG%2BxWyipsScn9VhR6yLde%2BrdLfjMV1uyUaBa%2Bgp5%2FZp%2FY0O8sA%2FX4w3%2BIBg5CfWWpH2EDnqve7FnCpwrmJVBasuvujGwaCw6pCedTl%2BbrCP%2F3G6BUJf%2BUj5qu0O9rkwJlptZBgSwPMO%2Bj5nUpK8AgJYyqmmhgvTpc5rS%2FzkUG%2F6Dkq8FYn0Rh1cm6RdaBzmllVHWSsp3oLXZ57r1DKe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241010T024609Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAVCD32OGIVZ5FHKZU%2F20241010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=2e5061ae85d13c71519cc372bc4ea9e49263fb334466fbb3d4f8342c2b6d4162',
    faviconUrl:
      'https://youland-common-images.s3.us-west-1.amazonaws.com/_1731251834.svg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMSJIMEYCIQDrDAzWcVRTQw2THTkKEMgWGzBJKvIF9bkeOAWvxPzNZwIhANMyiB6HndtoXVxIVfrFrK9pemiVWw4jj9Iyp9aRPeHZKoUECGkQAhoMMzQ4MTUyMDMzNjgxIgycLduNapKtSkGO%2F5gq4gPV2w%2B4WYlJZIZzieL1OPKlkhrsX%2F1z%2BDUBDXn9qi5wpj0MYb4gvchUkDyDoHTxnbFFufgbidNRyaMDe6Oi3J3024NKSWoEGel0GV6R%2BPi2U%2Bk%2BL8JI8PeriX1JzsurzQ9tWkxsXH0fB1gPR%2FjDqCDQpH2UsgMwK37wtaan0g4TNUQLuc0U52rPq6%2FBvqDRYUYMJMYnY1KzIEyAz1wKtD45TLSNwsUibrW4kJoKMPPwhqIIgc6s6y2EdyXNSBG1ZV0Ji9X8bl10Un7mGIY26JaEuvtLs7jtUnCtlFXIO5M3f863jXalJzZWVFXLFR%2BV%2FmS1cfhP%2BE%2FG4FreKJn2oG4xh4r%2Bk3AO4JkcZbSh%2FMbpBKXDhomHArJ8HftsYfvGmb%2FitECvtBv2GRIz6VueDmqw9yibPPOHuZNfhoOAKdRpua%2B%2B%2FYERBQgx8Z2i4qLFHzeGbwLteiKttRDBQD0iPa0X9OYxyNLRZRAo9lx%2BTDz%2FoL0k7MH2jgLYddj8%2B%2FLUrIVZZtGa6GtYQOO%2FKSy88sE58i4M8nBtijews6HLyqIT0%2B3dG53gBSkkx%2BOJ6muyEcNX%2Blev%2Fk421TijDmG5ourHBNt45mpgg86NLOtmfWh3joGPIDrdQRsK4fBkW9YEjWOWmzCjp5y4BjqkAX2izlKCERG%2BxWyipsScn9VhR6yLde%2BrdLfjMV1uyUaBa%2Bgp5%2FZp%2FY0O8sA%2FX4w3%2BIBg5CfWWpH2EDnqve7FnCpwrmJVBasuvujGwaCw6pCedTl%2BbrCP%2F3G6BUJf%2BUj5qu0O9rkwJlptZBgSwPMO%2Bj5nUpK8AgJYyqmmhgvTpc5rS%2FzkUG%2F6Dkq8FYn0Rh1cm6RdaBzmllVHWSsp3oLXZ57r1DKe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241010T024609Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAVCD32OGIVZ5FHKZU%2F20241010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=ff80d9ea8cc1df226a065178ad9361c71897213ef01fd412ab9ef7d63d891b0f',
    organizationName: 'Youland',
    email: 'borrow@youland.com',
    phone: '1234567899',
    website: 'https://youland.com',
    address: {
      isFinished: false,
      address: '2420 Sand Hill Road',
      aptNumber: '201088',
      city: 'Menlo Park',
      state: 'CA',
      statename: null,
      postcode: '94025',
      countyFIPS: null,
      placeId: null,
      lat: null,
      lng: null,
      formConfig: {
        option: true,
        skipNull: false,
      },
    },
    organizationInfo: {
      name: 'Youland',
    },
    posSettings: {
      phone: '5456465678',
      email: 'mace@youland.com',
      members: [
        {
          isFinished: false,
          firstName: 'MKK',
          lastName: 'JJK',
          name: 'MKK JJK',
          birthDay: null,
          gender: null,
          maritalStatus: null,
          age: null,
          email: 'mike2yeqiu@outlook.com',
          phone: '1234234234',
          ssn: null,
          companyName: null,
          title: null,
          avatar:
            'https://youland-common-images.s3.us-west-1.amazonaws.com/20200810195438_jmwgl_0776264693.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMSJIMEYCIQDrDAzWcVRTQw2THTkKEMgWGzBJKvIF9bkeOAWvxPzNZwIhANMyiB6HndtoXVxIVfrFrK9pemiVWw4jj9Iyp9aRPeHZKoUECGkQAhoMMzQ4MTUyMDMzNjgxIgycLduNapKtSkGO%2F5gq4gPV2w%2B4WYlJZIZzieL1OPKlkhrsX%2F1z%2BDUBDXn9qi5wpj0MYb4gvchUkDyDoHTxnbFFufgbidNRyaMDe6Oi3J3024NKSWoEGel0GV6R%2BPi2U%2Bk%2BL8JI8PeriX1JzsurzQ9tWkxsXH0fB1gPR%2FjDqCDQpH2UsgMwK37wtaan0g4TNUQLuc0U52rPq6%2FBvqDRYUYMJMYnY1KzIEyAz1wKtD45TLSNwsUibrW4kJoKMPPwhqIIgc6s6y2EdyXNSBG1ZV0Ji9X8bl10Un7mGIY26JaEuvtLs7jtUnCtlFXIO5M3f863jXalJzZWVFXLFR%2BV%2FmS1cfhP%2BE%2FG4FreKJn2oG4xh4r%2Bk3AO4JkcZbSh%2FMbpBKXDhomHArJ8HftsYfvGmb%2FitECvtBv2GRIz6VueDmqw9yibPPOHuZNfhoOAKdRpua%2B%2B%2FYERBQgx8Z2i4qLFHzeGbwLteiKttRDBQD0iPa0X9OYxyNLRZRAo9lx%2BTDz%2FoL0k7MH2jgLYddj8%2B%2FLUrIVZZtGa6GtYQOO%2FKSy88sE58i4M8nBtijews6HLyqIT0%2B3dG53gBSkkx%2BOJ6muyEcNX%2Blev%2Fk421TijDmG5ourHBNt45mpgg86NLOtmfWh3joGPIDrdQRsK4fBkW9YEjWOWmzCjp5y4BjqkAX2izlKCERG%2BxWyipsScn9VhR6yLde%2BrdLfjMV1uyUaBa%2Bgp5%2FZp%2FY0O8sA%2FX4w3%2BIBg5CfWWpH2EDnqve7FnCpwrmJVBasuvujGwaCw6pCedTl%2BbrCP%2F3G6BUJf%2BUj5qu0O9rkwJlptZBgSwPMO%2Bj5nUpK8AgJYyqmmhgvTpc5rS%2FzkUG%2F6Dkq8FYn0Rh1cm6RdaBzmllVHWSsp3oLXZ57r1DKe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241010T024609Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAVCD32OGIVZ5FHKZU%2F20241010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=af102dbf79e8e9f4b53038f54b2cd37c636fed0664eebb50e263c414b041a740',
          position: null,
          addressInfo: null,
          residencyStatus: null,
          userId: '1000022024031200001085',
          profile: null,
          realLoanOfficer: true,
          backgroundColor: null,
          formConfig: {
            option: true,
            skipNull: false,
          },
        },
        {
          isFinished: false,
          firstName: 'mace ',
          lastName: 'guo',
          name: 'mace@youland.com',
          birthDay: null,
          gender: null,
          maritalStatus: null,
          age: null,
          email: 'mace@youland.com',
          phone: '9890890890',
          ssn: null,
          companyName: null,
          title: null,
          avatar:
            'https://youland-common-images.s3.us-west-1.amazonaws.com/home_buyer_alert_pic_4220311327.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMSJIMEYCIQDrDAzWcVRTQw2THTkKEMgWGzBJKvIF9bkeOAWvxPzNZwIhANMyiB6HndtoXVxIVfrFrK9pemiVWw4jj9Iyp9aRPeHZKoUECGkQAhoMMzQ4MTUyMDMzNjgxIgycLduNapKtSkGO%2F5gq4gPV2w%2B4WYlJZIZzieL1OPKlkhrsX%2F1z%2BDUBDXn9qi5wpj0MYb4gvchUkDyDoHTxnbFFufgbidNRyaMDe6Oi3J3024NKSWoEGel0GV6R%2BPi2U%2Bk%2BL8JI8PeriX1JzsurzQ9tWkxsXH0fB1gPR%2FjDqCDQpH2UsgMwK37wtaan0g4TNUQLuc0U52rPq6%2FBvqDRYUYMJMYnY1KzIEyAz1wKtD45TLSNwsUibrW4kJoKMPPwhqIIgc6s6y2EdyXNSBG1ZV0Ji9X8bl10Un7mGIY26JaEuvtLs7jtUnCtlFXIO5M3f863jXalJzZWVFXLFR%2BV%2FmS1cfhP%2BE%2FG4FreKJn2oG4xh4r%2Bk3AO4JkcZbSh%2FMbpBKXDhomHArJ8HftsYfvGmb%2FitECvtBv2GRIz6VueDmqw9yibPPOHuZNfhoOAKdRpua%2B%2B%2FYERBQgx8Z2i4qLFHzeGbwLteiKttRDBQD0iPa0X9OYxyNLRZRAo9lx%2BTDz%2FoL0k7MH2jgLYddj8%2B%2FLUrIVZZtGa6GtYQOO%2FKSy88sE58i4M8nBtijews6HLyqIT0%2B3dG53gBSkkx%2BOJ6muyEcNX%2Blev%2Fk421TijDmG5ourHBNt45mpgg86NLOtmfWh3joGPIDrdQRsK4fBkW9YEjWOWmzCjp5y4BjqkAX2izlKCERG%2BxWyipsScn9VhR6yLde%2BrdLfjMV1uyUaBa%2Bgp5%2FZp%2FY0O8sA%2FX4w3%2BIBg5CfWWpH2EDnqve7FnCpwrmJVBasuvujGwaCw6pCedTl%2BbrCP%2F3G6BUJf%2BUj5qu0O9rkwJlptZBgSwPMO%2Bj5nUpK8AgJYyqmmhgvTpc5rS%2FzkUG%2F6Dkq8FYn0Rh1cm6RdaBzmllVHWSsp3oLXZ57r1DKe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241010T024609Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAVCD32OGIVZ5FHKZU%2F20241010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=4ff8709033e4880bd83b48488b4dbe1dfdcbab1a795bc09d2abfc40e265e5cbf',
          position: null,
          addressInfo: null,
          residencyStatus: null,
          userId: '1000022023032300000640',
          profile: null,
          realLoanOfficer: true,
          backgroundColor: '#443024',
          formConfig: {
            option: true,
            skipNull: false,
          },
        },
        {
          isFinished: false,
          firstName: 'Rico',
          lastName: 'Shen',
          name: 'Rico Shen',
          birthDay: null,
          gender: null,
          maritalStatus: null,
          age: null,
          email: 'rico@Youland.com',
          phone: '2342342342',
          ssn: null,
          companyName: null,
          title: null,
          avatar: null,
          position: null,
          addressInfo: null,
          residencyStatus: null,
          userId: '1000022024020600001083',
          profile: null,
          realLoanOfficer: true,
          backgroundColor: null,
          formConfig: {
            option: true,
            skipNull: false,
          },
        },
        {
          isFinished: false,
          firstName: 'mike',
          lastName: 'joyee',
          name: 'mike joyee',
          birthDay: null,
          gender: null,
          maritalStatus: null,
          age: null,
          email: 'mike@youland.com',
          phone: '2132123123',
          ssn: null,
          companyName: null,
          title: 'ceo',
          avatar:
            'https://youland-common-images.s3.us-west-1.amazonaws.com/gift_box_re_vau4%201_0158837110.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMSJIMEYCIQDrDAzWcVRTQw2THTkKEMgWGzBJKvIF9bkeOAWvxPzNZwIhANMyiB6HndtoXVxIVfrFrK9pemiVWw4jj9Iyp9aRPeHZKoUECGkQAhoMMzQ4MTUyMDMzNjgxIgycLduNapKtSkGO%2F5gq4gPV2w%2B4WYlJZIZzieL1OPKlkhrsX%2F1z%2BDUBDXn9qi5wpj0MYb4gvchUkDyDoHTxnbFFufgbidNRyaMDe6Oi3J3024NKSWoEGel0GV6R%2BPi2U%2Bk%2BL8JI8PeriX1JzsurzQ9tWkxsXH0fB1gPR%2FjDqCDQpH2UsgMwK37wtaan0g4TNUQLuc0U52rPq6%2FBvqDRYUYMJMYnY1KzIEyAz1wKtD45TLSNwsUibrW4kJoKMPPwhqIIgc6s6y2EdyXNSBG1ZV0Ji9X8bl10Un7mGIY26JaEuvtLs7jtUnCtlFXIO5M3f863jXalJzZWVFXLFR%2BV%2FmS1cfhP%2BE%2FG4FreKJn2oG4xh4r%2Bk3AO4JkcZbSh%2FMbpBKXDhomHArJ8HftsYfvGmb%2FitECvtBv2GRIz6VueDmqw9yibPPOHuZNfhoOAKdRpua%2B%2B%2FYERBQgx8Z2i4qLFHzeGbwLteiKttRDBQD0iPa0X9OYxyNLRZRAo9lx%2BTDz%2FoL0k7MH2jgLYddj8%2B%2FLUrIVZZtGa6GtYQOO%2FKSy88sE58i4M8nBtijews6HLyqIT0%2B3dG53gBSkkx%2BOJ6muyEcNX%2Blev%2Fk421TijDmG5ourHBNt45mpgg86NLOtmfWh3joGPIDrdQRsK4fBkW9YEjWOWmzCjp5y4BjqkAX2izlKCERG%2BxWyipsScn9VhR6yLde%2BrdLfjMV1uyUaBa%2Bgp5%2FZp%2FY0O8sA%2FX4w3%2BIBg5CfWWpH2EDnqve7FnCpwrmJVBasuvujGwaCw6pCedTl%2BbrCP%2F3G6BUJf%2BUj5qu0O9rkwJlptZBgSwPMO%2Bj5nUpK8AgJYyqmmhgvTpc5rS%2FzkUG%2F6Dkq8FYn0Rh1cm6RdaBzmllVHWSsp3oLXZ57r1DKe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241010T024609Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAVCD32OGIVZ5FHKZU%2F20241010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=7d3d6c8395e7c28aac363971130ae5cf42f7b2d3b1b5b4415c1c542c8b54737b',
          position: null,
          addressInfo: null,
          residencyStatus: null,
          userId: '1000022023032300001000',
          profile: '',
          realLoanOfficer: true,
          backgroundColor: '#347202',
          formConfig: {
            option: true,
            skipNull: false,
          },
        },
      ],
      workingDays: 'Monday - Friday',
      workingHours: '9am - 6pm Pacific Time (PST)',
      themeColor: '#5B76BC',
      h: 222,
      s: 58,
      l: 48,
      domains: [
        {
          id: 3276,
          domainName: 'dev-apply.youland.com',
          state: 'CONNECTED',
          source: 'DEFAULT',
        },
        {
          id: 3277,
          domainName: '192.168.1.108',
          state: 'CONNECTED',
          source: 'DEFAULT',
        },
        {
          id: 4296,
          domainName: 'dev-pos.youland.com',
          state: 'CONNECTED',
          source: 'DEFAULT',
        },
        {
          id: 4297,
          domainName: '127.0.0.1',
          state: 'CONNECTED',
          source: 'DEFAULT',
        },
      ],
      customFee: {
        brokerOriginationPoints: 0,
        brokerAdditionalFee: [],
      },
      isWarning: false,
      borrowerTypes: [
        {
          key: 'CUSTOMER',
          value: 'Consumer',
          allowed: true,
        },
        {
          key: 'BROKER',
          value: 'Broker',
          allowed: true,
        },
        {
          key: 'BROKER',
          value: 'Broker',
          allowed: true,
        },
        {
          key: 'LOAN_OFFICER',
          value: 'Loan Officer',
          allowed: true,
        },
      ],
      customLoanTerms: [
        {
          key: 'CUSTOMER',
          value: 'Consumer',
          allowed: true,
        },
        {
          key: 'BROKER',
          value: 'Broker',
          allowed: true,
        },
        {
          key: 'REAL_ESTATE_AGENT',
          value: 'Real Estate Agent',
          allowed: true,
        },
        {
          key: 'LOAN_OFFICER',
          value: 'Loan Officer',
          allowed: true,
        },
      ],
      softCreditRequirement: 'OPTIONAL',
      letterSignee: {
        name: 'Richad',
        title: 'CEO',
        signature:
          'https://youland-common-images.s3.us-west-1.amazonaws.com/signature_644130246.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMSJIMEYCIQDrDAzWcVRTQw2THTkKEMgWGzBJKvIF9bkeOAWvxPzNZwIhANMyiB6HndtoXVxIVfrFrK9pemiVWw4jj9Iyp9aRPeHZKoUECGkQAhoMMzQ4MTUyMDMzNjgxIgycLduNapKtSkGO%2F5gq4gPV2w%2B4WYlJZIZzieL1OPKlkhrsX%2F1z%2BDUBDXn9qi5wpj0MYb4gvchUkDyDoHTxnbFFufgbidNRyaMDe6Oi3J3024NKSWoEGel0GV6R%2BPi2U%2Bk%2BL8JI8PeriX1JzsurzQ9tWkxsXH0fB1gPR%2FjDqCDQpH2UsgMwK37wtaan0g4TNUQLuc0U52rPq6%2FBvqDRYUYMJMYnY1KzIEyAz1wKtD45TLSNwsUibrW4kJoKMPPwhqIIgc6s6y2EdyXNSBG1ZV0Ji9X8bl10Un7mGIY26JaEuvtLs7jtUnCtlFXIO5M3f863jXalJzZWVFXLFR%2BV%2FmS1cfhP%2BE%2FG4FreKJn2oG4xh4r%2Bk3AO4JkcZbSh%2FMbpBKXDhomHArJ8HftsYfvGmb%2FitECvtBv2GRIz6VueDmqw9yibPPOHuZNfhoOAKdRpua%2B%2B%2FYERBQgx8Z2i4qLFHzeGbwLteiKttRDBQD0iPa0X9OYxyNLRZRAo9lx%2BTDz%2FoL0k7MH2jgLYddj8%2B%2FLUrIVZZtGa6GtYQOO%2FKSy88sE58i4M8nBtijews6HLyqIT0%2B3dG53gBSkkx%2BOJ6muyEcNX%2Blev%2Fk421TijDmG5ourHBNt45mpgg86NLOtmfWh3joGPIDrdQRsK4fBkW9YEjWOWmzCjp5y4BjqkAX2izlKCERG%2BxWyipsScn9VhR6yLde%2BrdLfjMV1uyUaBa%2Bgp5%2FZp%2FY0O8sA%2FX4w3%2BIBg5CfWWpH2EDnqve7FnCpwrmJVBasuvujGwaCw6pCedTl%2BbrCP%2F3G6BUJf%2BUj5qu0O9rkwJlptZBgSwPMO%2Bj5nUpK8AgJYyqmmhgvTpc5rS%2FzkUG%2F6Dkq8FYn0Rh1cm6RdaBzmllVHWSsp3oLXZ57r1DKe&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241010T024609Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIAVCD32OGIVZ5FHKZU%2F20241010%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Expires=86400&X-Amz-Signature=cf2c8342a0c00124413ae4d7f3af0c3d94fba97b989286ebda52ce35cffa199a',
      },
      useDutch: true,
      domainName: 'dev-apply.youland.com',
    },
    losSettings: {
      customFee: {
        lenderOriginationFee: 1.6,
        lenderOriginationPoints: 1.6,
        floodCertification: 100,
        underwritingFee: 1695,
        documentPreparationFee: 895,
        creditReport: 150,
        projectOversightFee: null,
        backgroundCheck: 100,
        miscFee: null,
        lenderAdditionalFee: [
          {
            fieldName: 'heheda',
            unit: 'DOLLAR',
            value: 234,
          },
        ],
        thirdPartyAdditionalFee: [
          {
            fieldName: 'dfh',
            unit: 'DOLLAR',
            value: 34,
          },
        ],
        isWarning: false,
      },
    },
    signOffEmail: 'match@youland.com',
    replyEmail: '1@133',
    saasUrl: 'dev-pos',
    whiteLabelUrl: null,
    lenderLicenseNumber: null,
    legalAgreements: {
      privacyPolicyUrl: 'https://ba.com',
      termsUrl: 'https://ba.com',
      signaturesUrl: 'bga.com',
    },
    notificationRule: {
      signUp: [
        {
          id: 251,
          tenantId: '1000052022092800000102',
          name: 'fdsafdsa',
          rolePermissions: null,
          description: 'fffffddd',
          extInfo: null,
          accountList: null,
        },
        {
          id: 156,
          tenantId: '1000052022092800000102',
          name: 'Test',
          rolePermissions: null,
          description: 'test',
          extInfo: null,
          accountList: null,
        },
        {
          id: 1,
          tenantId: '1000052022092800000102',
          name: 'Admin',
          rolePermissions: null,
          description: 'Admin',
          extInfo: null,
          accountList: null,
        },
        {
          id: 2,
          tenantId: '1000052022092800000102',
          name: 'Loan officer',
          rolePermissions: null,
          description: 'Loan officer',
          extInfo: null,
          accountList: null,
        },
      ],
      submitLoan: [
        {
          id: 253,
          tenantId: '1000052022092800000102',
          name: '1111',
          rolePermissions: null,
          description: '1111',
          extInfo: null,
          accountList: null,
        },
        {
          id: 162,
          tenantId: '1000052022092800000102',
          name: 'Test2',
          rolePermissions: null,
          description: 'test',
          extInfo: null,
          accountList: null,
        },
      ],
      approveLoan: [
        {
          id: 156,
          tenantId: '1000052022092800000102',
          name: 'Test',
          rolePermissions: null,
          description: 'test',
          extInfo: null,
          accountList: null,
        },
        {
          id: 1,
          tenantId: '1000052022092800000102',
          name: 'Admin',
          rolePermissions: null,
          description: 'Admin',
          extInfo: null,
          accountList: null,
        },
      ],
      rejectLoan: [
        {
          id: 162,
          tenantId: '1000052022092800000102',
          name: 'Test2',
          rolePermissions: null,
          description: 'test',
          extInfo: null,
          accountList: null,
        },
        {
          id: 156,
          tenantId: '1000052022092800000102',
          name: 'Test',
          rolePermissions: null,
          description: 'test',
          extInfo: null,
          accountList: null,
        },
      ],
      changeBrokerFee: null,
    },
    servicePackageEntity: {
      createdAt: '2023-08-17T13:33:40Z',
      updatedAt: '2023-08-17T13:33:41Z',
      version: 1,
      createdBy: null,
      updatedBy: null,
      isDeleted: null,
      id: 2,
      tenantId: '1000052022092800000102',
      name: 'Beta features',
      price: 0,
      unit: 1,
      description: 'Pay for the documents generated on a per-loan basis',
      cusFunctions: [
        {
          functionId: 1,
          price: null,
        },
        {
          functionId: 2,
          price: null,
        },
        {
          functionId: 3,
          price: null,
        },
        {
          functionId: 4,
          price: null,
        },
      ],
      accountCount: 0,
      extInfo: null,
    },
    extInfo: {
      losSettings: {
        customFee: {
          lenderOriginationFee: 1.6,
          lenderOriginationPoints: 1.6,
          floodCertification: 100,
          underwritingFee: 1695,
          documentPreparationFee: 895,
          creditReport: 150,
          backgroundCheck: 100,
          lenderAdditionalFee: [
            {
              fieldName: 'heheda',
              unit: 'DOLLAR',
              value: 234,
            },
          ],
          thirdPartyAdditionalFee: [
            {
              fieldName: 'dfh',
              unit: 'DOLLAR',
              value: 34,
            },
          ],
          isWarning: false,
        },
      },
      posSettings: {
        phone: '5456465678',
        email: 'mace@youland.com',
        members: [
          {
            isFinished: false,
            name: 'MKK JJK',
            email: 'mike2yeqiu@outlook.com',
            phone: '1234234234',
            title: '9999',
            avatar:
              'https://youland-common-images.s3.us-west-1.amazonaws.com/20200810195438_jmwgl_0776264693.jpeg',
            position: '999',
            formConfig: {
              option: true,
              skipNull: false,
            },
          },
          {
            isFinished: false,
            firstName: 'mace ',
            lastName: 'guo',
            name: 'Mace',
            email: 'mace@youland.com',
            phone: '9890890890',
            avatar: '',
            userId: '1000022023032300000640',
            realLoanOfficer: true,
            formConfig: {
              option: true,
              skipNull: false,
            },
          },
          {
            isFinished: false,
            firstName: 'Rico',
            lastName: 'Shen',
            name: 'Rico Shen',
            email: 'rico@Youland.com',
            phone: '2342342342',
            userId: '1000022024020600001083',
            realLoanOfficer: true,
            formConfig: {
              option: true,
              skipNull: false,
            },
          },
        ],
        workingDays: 'Monday - Friday',
        workingHours: '9am - 6pm Pacific Time (PST)',
        themeColor: '#5B76BC',
        h: 222,
        s: 58,
        l: 48,
        domains: [
          {
            id: 1,
            domainName: 'aaa.bbb.com',
            state: 'WAITING_VERIFICATION',
            source: 'CUSTOM',
          },
          {
            id: 667,
            domainName: 'youland.us2',
            state: 'NOT_LINKED',
            source: 'CUSTOM',
          },
          {
            id: 743,
            domainName: 'ww.youland.com',
            state: 'WAITING_VERIFICATION',
            source: 'CUSTOM',
          },
          {
            id: 3245,
            domainName: 'dev-pos.youland.com',
            state: 'CONNECTED',
            source: 'DEFAULT',
          },
        ],
        customFee: {
          brokerOriginationPoints: 0,
          brokerAdditionalFee: [],
        },
        isWarning: false,
        borrowerTypes: [
          {
            key: 'CUSTOMER',
            value: 'Consumer',
            allowed: true,
          },
          {
            key: 'BROKER',
            value: 'Broker',
            allowed: true,
          },
          {
            key: 'BROKER',
            value: 'Broker',
            allowed: true,
          },
          {
            key: 'LOAN_OFFICER',
            value: 'Loan Officer',
            allowed: true,
          },
        ],
        customLoanTerms: [
          {
            key: 'CUSTOMER',
            value: 'Consumer',
            allowed: true,
          },
          {
            key: 'BROKER',
            value: 'Broker',
            allowed: true,
          },
          {
            key: 'REAL_ESTATE_AGENT',
            value: 'Real Estate Agent',
            allowed: true,
          },
          {
            key: 'LOAN_OFFICER',
            value: 'Loan Officer',
            allowed: true,
          },
        ],
        softCreditRequirement: 'OPTIONAL',
        letterSignee: {
          name: 'Richad',
          title: 'CEO',
          signature:
            'https://youland-common-images.s3.us-west-1.amazonaws.com/signature_644130246.png',
        },
        useDutch: true,
        domainName: 'dev-pos.youland.com',
      },
    },
    freeTrialState: 'None',
    useTimes: 0,
    serviceTypeEnum: 'SAAS',
    serviceSelected: true,
    fromEmail: 'YouLand <software@Youland.com>',
  },
  gmtCreate: '2023-03-23T03:54:46.824726',
  gmtModified: '2024-09-10T02:10:20.813001',
  creator: 'mace@youland.com',
  editor: 'mace  guo',
  createdAt: '2023-03-23T03:54:46.921728Z',
  updatedAt: '2024-10-10T02:46:02.268807Z',
};

const initialized = true;

const licensedProduct = [
  {
    id: 2,
    tenantId: '1000052022092800000102',
    productType: 2,
    paymentModel: 2,
    price: 0,
    level: 2,
    name: 'Point of Sale',
    url: 'los/loan/approval/approve',
    description: null,
    extInfo: null,
  },
  {
    id: 3,
    tenantId: '1000052022092800000102',
    productType: 2,
    paymentModel: 2,
    price: 0,
    level: 2,
    name: 'Loan Origination System',
    url: 'los/loan/approval/approve',
    description: null,
    extInfo: null,
  },
  {
    id: 4,
    tenantId: '1000052022092800000102',
    productType: 2,
    paymentModel: 2,
    price: 0,
    level: 2,
    name: 'Pricing Engine',
    url: 'los/loan/approval/approve',
    description: null,
    extInfo: null,
  },
  {
    id: 1,
    tenantId: '1000052022092800000102',
    productType: 2,
    paymentModel: 2,
    price: 0,
    level: 1,
    name: 'Document Engine',
    url: 'los/loan/approval/approve',
    description: null,
    extInfo: null,
  },
];

export const StyledLayoutHeader: FC<LayoutHeaderProps> = ({
  isHomepage = false,
  actions,
}) => {
  //const store = useMst();
  //const { userSetting, session } = store;
  //const { initialized, setting, licensedProduct } = userSetting;

  const router = useRouter();
  const pathname = usePathname();

  const { visible, open, close } = useSwitch(false);

  const [anchorElProduct, setAnchorElProduct] = useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const productList = useMemo(() => {
    if (!initialized) {
      return [];
    }

    const productsData: Record<string, any> = {
      'Point of Sale': {
        label: 'Point of Sale',
        url: `${URL_POS}/?token=${
          session?.accessToken?.jwtToken ||
          localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon component={LOGO_PRODUCT_POS} sx={{ width: 32, height: 32 }} />
        ),
      },
      'Loan Origination System': {
        label: 'Loan Origination System',
        url: `${URL_LOS}/?token=${
          session?.accessToken?.jwtToken ||
          localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon component={LOGO_PRODUCT_LOS} sx={{ width: 32, height: 32 }} />
        ),
      },
      'Pricing Engine': {
        label: 'Pricing Engine',
        url: `${URL_PRICING}/?token=${
          session?.accessToken?.jwtToken ||
          localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon component={LOGO_PRODUCT_PRICE} sx={{ width: 32, height: 32 }} />
        ),
      },
      'Document Engine': {
        label: 'Document Engine',
        url: `${URL_DOC}/?token=${
          session?.accessToken?.jwtToken ||
          localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon component={LOGO_PRODUCT_DOC} sx={{ width: 32, height: 32 }} />
        ),
      },
      'Loan Servicing': {
        label: 'Loan Servicing',
        url: `${URL_DOC}/?token=${
          session?.accessToken?.jwtToken ||
          localStorage?.getItem('USER_LOGIN_INFORMATION')
        }`,
        icon: (
          <Icon
            component={LOGO_PRODUCT_SERVING}
            sx={{ width: 32, height: 32 }}
          />
        ),
      },
      'Customer Center': {
        label: 'Customer Center',
        url: '/contacts/directory',
        icon: (
          <Icon
            component={LOGO_PRODUCT_CUSTOMER}
            sx={{ width: 32, height: 32 }}
          />
        ),
      },
    };

    const productsKeys = Object.keys(productsData);
    const fromServer = licensedProduct.map(
      (item) => productsKeys.includes(item.name) && productsData[item.name],
    );
    //only youland and test user can see loan servicing
    let result;

    if (
      ['1000052022092800000102', '1000052023032900000107'].includes(
        setting?.tenantId,
      )
    ) {
      result = fromServer.concat([
        {
          label: 'Loan Servicing',
          url: `${URL_DOC}/?token=${
            session?.accessToken?.jwtToken ||
            localStorage?.getItem('USER_LOGIN_INFORMATION')
          }`,
          icon: (
            <Icon
              component={LOGO_PRODUCT_SERVING}
              sx={{ width: 32, height: 32 }}
            />
          ),
        },
        {
          label: 'Customer Center',
          url: '/contacts/directory',
          icon: (
            <Icon
              component={LOGO_PRODUCT_CUSTOMER}
              sx={{ width: 32, height: 32 }}
            />
          ),
        },
      ]);
    }
    return result;
  }, [initialized, licensedProduct, session?.accessToken?.jwtToken, setting]);

  const avatarName = useMemo(() => {
    const target =
      setting?.userInfo?.firstName?.[0] + setting?.userInfo?.lastName?.[0] ||
      '';
    const result = target.match(/[a-zA-Z]+/g);
    return result ? result[0] : '';
  }, [setting?.userInfo?.firstName, setting?.userInfo?.lastName]);

  const avatarUrl = useMemo(() => {
    if (!setting?.userInfo?.avatar) {
      if (!avatarName) {
        return '/images/pos/placeholder_avatar.png';
      }
      return '';
    }
    return setting?.userInfo?.avatar;
  }, [avatarName, setting?.userInfo?.avatar]);

  const avatarFullName = useMemo(() => {
    return `${
      setting?.userInfo?.firstName ? `${setting?.userInfo?.firstName} ` : ''
    }${setting?.userInfo?.lastName}`;
  }, [setting?.userInfo?.firstName, setting?.userInfo?.lastName]);

  return (
    <>
      <Stack
        alignItems={'center'}
        bgcolor={'background.white'}
        borderBottom={'1px solid'}
        borderColor={'border.normal'}
        flexDirection={'row'}
        height={'60px'}
        justifyContent={'space-between'}
        px={6}
        sx={{
          transition: 'all .3s',
          position: 'sticky',
          top: 0,
          boxShadow: 'none',
          zIndex: 999,
          minWidth: '100%',
        }}
      >
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          gap={6}
          height={'100%'}
        >
          <Icon
            component={LOGO_PRODUCT_BOX}
            onClick={(e: any) => {
              setAnchorElProduct(anchorElProduct ? null : e.currentTarget);
              setAnchorElUser(null);
            }}
            sx={{
              width: 32,
              height: 32,
              maxHeight: 32,
              maxWidth: 32,
              cursor: 'pointer',
              transition: 'all .3s',
            }}
          />
          {/*according to different product replace counterpart icon*/}
          <Icon
            component={isHomepage ? LOGO_HEADER_SETTING : LOGO_HEADER_CUSTOMER}
            sx={{ height: '24px', width: 'auto' }}
          />

          {/*{!isHomepage && (*/}
          {/*  <Stack*/}
          {/*    alignItems={'center'}*/}
          {/*    component={'ul'}*/}
          {/*    flexDirection={'row'}*/}
          {/*    gap={6}*/}
          {/*    height={'100%'}*/}
          {/*  >*/}
          {/*    {LAYOUT_HEADER_TAB.map((item, index) => (*/}
          {/*      <Stack*/}
          {/*        className={*/}
          {/*          pathname === item.url || pathname.includes('loan')*/}
          {/*            ? 'active'*/}
          {/*            : ''*/}
          {/*        }*/}
          {/*        color={'text.primary'}*/}
          {/*        component={'li'}*/}
          {/*        fontSize={14}*/}
          {/*        fontWeight={600}*/}
          {/*        height={'100%'}*/}
          {/*        justifyContent={'center'}*/}
          {/*        key={`${item.label}_${index}`}*/}
          {/*        mx={3}*/}
          {/*        onClick={() => router.push(item.url)}*/}
          {/*        position={'relative'}*/}
          {/*        sx={{*/}
          {/*          cursor: 'pointer',*/}
          {/*          '&:hover': { color: 'primary.main' },*/}
          {/*          '&.active': {*/}
          {/*            color: 'primary.darker',*/}
          {/*            '&::after': {*/}
          {/*              content: '""',*/}
          {/*              display: 'block',*/}
          {/*              position: 'absolute',*/}
          {/*              bottom: 0,*/}
          {/*              left: 0,*/}
          {/*              width: '100%',*/}
          {/*              height: '4px',*/}
          {/*              bgcolor: 'primary.darker',*/}
          {/*              borderRadius: 3,*/}
          {/*            },*/}
          {/*          },*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        {item.label}*/}
          {/*      </Stack>*/}
          {/*    ))}*/}
          {/*    {actions}*/}
          {/*  </Stack>*/}
          {/*)}*/}
        </Stack>

        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          gap={3}
          height={'100%'}
        >
          {pathname !== '/' && (
            <Tooltip
              PopperProps={{
                sx: { zIndex: '99999 !important', maxWidth: 144 },
              }}
              title={'Organization settings'}
            >
              <Stack
                height={24}
                onClick={() =>
                  router.push(
                    `${URL_HOME}/settings/organization/general/${
                      session?.accessToken?.jwtToken ||
                      localStorage?.getItem('USER_LOGIN_INFORMATION')
                    }`,
                  )
                }
                width={24}
              >
                <Icon
                  component={LOGO_SETTING}
                  sx={{
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                  }}
                />
              </Stack>
            </Tooltip>
          )}

          <Stack
            alignItems={'center'}
            flexBasis={192}
            flexDirection={'row'}
            fontSize={14}
            gap={1.5}
            height={'100%'}
            onClick={(e) => {
              setAnchorElUser(anchorElUser ? null : e.currentTarget);
              setAnchorElProduct(null);
            }}
            px={3}
            sx={{ cursor: 'pointer' }}
          >
            <Avatar
              src={avatarUrl}
              sx={{
                bgcolor: setting?.userInfo?.backgroundColor,
                width: 30,
                height: 30,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {avatarName}
            </Avatar>

            <Tooltip
              placement={'bottom-start'}
              PopperProps={{
                sx: { zIndex: '99999 !important', maxWidth: 144 },
                [`${anchorElUser && 'open'}`]: !anchorElUser,
              }}
              title={`${setting?.userInfo?.name}`}
            >
              <Stack width={144}>
                <Typography
                  color={'text.primary'}
                  fontSize={12}
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  variant={'subtitle1'}
                >
                  {avatarFullName}
                </Typography>
                <Typography color={'info.main'} variant={'body3'}>
                  {setting?.roles?.[0]?.description}
                </Typography>
              </Stack>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>

      {/*product box*/}
      <Popover
        anchorEl={anchorElProduct}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        anchorReference={'anchorEl'}
        id={'LAYOUT_HEADER_PRODUCT_POPOVER'}
        onClose={() => setAnchorElProduct(null)}
        open={Boolean(anchorElProduct)}
        slotProps={{
          paper: {
            sx: {
              px: 3,
              pt: 3,
              pb: 6,
              boxShadow: 'none',
              border: '1px solid',
              borderColor: 'border.normal',
              borderRadius: 4,
              mt: 5,
            },
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack
          alignItems={'center'}
          direction={'row'}
          justifyContent={'space-between'}
          mb={3}
        >
          <Typography variant={'h7'}>Switch to</Typography>
          <Icon
            component={LOGO_PRODUCT_HOME}
            onClick={() =>
              router.push(
                `${URL_HOME}/?token=${
                  session?.accessToken?.jwtToken ||
                  localStorage?.getItem('USER_LOGIN_INFORMATION')
                }`,
              )
            }
            sx={{
              cursor: 'pointer',
              '&:hover': {
                path: {
                  stroke: '#5C7CD0',
                },
              },
            }}
          />
        </Stack>
        <Stack gap={3}>
          {productList?.map((item, index) => (
            <Stack
              alignItems={'center'}
              alignSelf={'stretch'}
              border={'2px solid'}
              borderColor={'border.hover'}
              borderRadius={2}
              flexDirection={'row'}
              gap={1.5}
              key={`${item.label}_${index}`}
              onClick={async () => {
                router.push(item.url);
                setAnchorElProduct(null);
              }}
              p={1.5}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'primary.light',
                  borderColor: 'primary.contrastBackground',
                },
              }}
              width={352}
            >
              {item.icon}
              <Typography variant={'subtitle1'}>{item.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Popover>

      {/*user setting*/}
      <Popover
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        //anchorReference={'anchorEl'}
        id={'LAYOUT_HEADER_USER_POPOVER'}
        onClose={() => setAnchorElUser(null)}
        open={Boolean(anchorElUser)}
        slotProps={{
          paper: {
            sx: {
              boxShadow:
                '0px 10px 10px 0px rgba(17, 52, 227, 0.10), 0px 0px 2px 0px rgba(17, 52, 227, 0.10)',
              ml: 3.5,
              mt: 3,
              borderRadius: 2,
            },
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack
          alignItems={'center'}
          flexDirection={'row'}
          gap={1.25}
          onClick={open}
          px={0.5}
          py={1.75}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              path: {
                fill: '#5B76BC',
              },
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            },
          }}
          width={180}
        >
          <Icon
            component={LOGO_SIGN_OUT}
            sx={{ height: 24, width: 24, ml: 1.25 }}
          />
          <Typography color={'inherit'} variant={'body2'}>
            Sign out
          </Typography>
        </Stack>
      </Popover>

      <StyledDialog
        content={
          <Typography color={'info.main'} py={3}>
            Sign out of current account?
          </Typography>
        }
        disableEscapeKeyDown={true}
        footer={
          <Stack flexDirection={'row'} gap={1.5}>
            <StyledButton
              color={'info'}
              onClick={close}
              size={'small'}
              variant={'outlined'}
            >
              Cancel
            </StyledButton>
            <StyledButton
              onClick={() => {
                close();
                //store.logout();
              }}
              size={'small'}
            >
              Confirm
            </StyledButton>
          </Stack>
        }
        header={'Sign out'}
        onClose={close}
        open={visible}
      />
    </>
  );
};
