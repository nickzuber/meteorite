import React from 'react';
import { Link as RouterLink } from "@reach/router";
import styled from 'react-emotion';
import { routes } from '../../constants';
import Curve from '../../components/Curve';
import '../../styles/gradient.css';

const Header = styled('h1')({
  color: '#fff',
  padding: '0 20px',
  margin: '0 auto 20px',
  letterSpacing: '-1.5px'
});

const SubHeader = styled(Header)({
  fontWeight: 500,
  maxWidth: 550,
  color: '#fff',
  fontSize: 24,
  marginBottom: 30,
  letterSpacing: '-1.0px'
});

const LandingHeader = styled('div')({
  width: '100%',
  margin: '54px 20px',
  maxWidth: 1000,
  display: 'flex',
  justifyContent: 'space-between',
});

const LandingMessage = styled(LandingHeader)({
  flexDirection: 'column',
  textAlign: 'center',
  maxWidth: 1000,
  'h1': {
    display: 'block'
  }
});

const SmallLink = styled('a')({
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#ffffff',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
});

const BottomLinkContainer = styled(LandingHeader)({
  maxWidth: '390px',
  width: '100%',
  margin: '32px auto 0',
});

const Logo = styled('div')({
  marginLeft: 15,
  background: 'green',
  width: 50,
  height: 50,
});

const LinkButton = styled('a')({});

export default function Scene ({loggedIn, onLogout, ...props}) {
  return (
    <div className="container-gradient" style={{
      width: '100%',
      height: 600,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden',
      // background: 'radial-gradient(farthest-corner at -0% 100%, #9065ff 30%, #00ffbe 95%)'
    }}>
      <LandingHeader>
        <Logo />
        {loggedIn ? (
          <div className="button-container">
            <RouterLink style={{marginRight: 15}} to={routes.INBOX}>notifications</RouterLink>
            <LinkButton style={{marginRight: 15}} href="#" onClick={onLogout}>logout</LinkButton>
          </div>
        ) : (
          <div className="button-container">
            <RouterLink style={{marginRight: 15}} to={routes.LOGIN}>login</RouterLink>
          </div>
        )}
      </LandingHeader>
      <LandingMessage>
        <Header>Manage your notifications</Header>
        <SubHeader>Stop manually sorting through GitHub notifications and start being productive.</SubHeader>
        <div className="button-container">
          <RouterLink to={routes.LOGIN}>let's get started</RouterLink>
        </div>
        <BottomLinkContainer>
          <SmallLink href="">View and contribute on GitHub</SmallLink>
          <SmallLink href="">View and contribute on GitHub</SmallLink>
        </BottomLinkContainer>
      </LandingMessage>
      <Curve />
    </div>
  );
};
