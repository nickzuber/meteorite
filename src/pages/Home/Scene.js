import React from 'react';
import { Link as RouterLink } from "@reach/router";
import styled from 'react-emotion';
import { routes } from '../../constants';
import Curve from '../../components/Curve';
import Icon from '../../components/Icon';
import Logo from '../../components/Logo';
import '../../styles/gradient.css';

function createImagePlaceholder (highlight) {
  return (
    <ImagePlaceholder>
      {/* navigation backdrop */}
      <div style={{
        position: 'absolute',
        background: '#dee1e6',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        top: 0,
        left: 0,
        right: 0,
        height: 35
      }} />
      {/* buttons */}
      <div style={{
        position: 'absolute',
        background: '#ff5e52',
        top: 13,
        left: 10,
        borderRadius: '100%',
        height: 10,
        width: 10,
      }} />
      <div style={{
        position: 'absolute',
        background: '#ffbe05',
        top: 13,
        left: 10 + 16,
        borderRadius: '100%',
        height: 10,
        width: 10,
      }} />
      <div style={{
        position: 'absolute',
        background: '#16cc38',
        top: 13,
        left: 10 + 32,
        borderRadius: '100%',
        height: 10,
        width: 10,
      }} />
      {/* url */}
      <div style={{
        position: 'absolute',
        background: '#f1f3f4',
        top: 40,
        left: 30,
        right: 30,
        height: 20,
        borderRadius: 100
      }} />
      {/* webpage header */}
      <div style={{
        position: 'absolute',
        background: '#24292e',
        top: 65,
        left: 0,
        right: 0,
        height: 30,
      }} />
      <div style={{
        position: 'absolute',
        background: '#3f4954',
        top: 71,
        left: 50,
        height: 18,
        width: 300,
        borderRadius: 5
      }} />
      {/* status headers */}
      <div style={{
        position: 'absolute',
        background: 'rgb(0, 209, 154)',
        top: 120,
        left: 100,
        width: 30,
        height: 10,
        borderRadius: 4
      }} />
      <div style={{
        position: 'absolute',
        background: 'rgb(0, 209, 154)',
        top: 140,
        left: 100,
        width: 100,
        height: 5,
        borderRadius: 4
      }} />
      <div style={{
        position: 'absolute',
        background: 'rgb(0, 158, 248)',
        top: 120,
        left: 210,
        width: 30,
        height: 10,
        borderRadius: 4
      }} />
      <div style={{
        position: 'absolute',
        background: 'rgb(0, 158, 248)',
        top: 140,
        left: 210,
        width: 100,
        height: 5,
        borderRadius: 4
      }} />
      <div style={{
        position: 'absolute',
        background: 'rgb(241, 44, 63)',
        top: 120,
        left: 320,
        width: 30,
        height: 10,
        borderRadius: 4
      }} />
      <div style={{
        position: 'absolute',
        background: 'rgb(241, 44, 63)',
        top: 140,
        left: 320,
        width: 100,
        height: 5,
        borderRadius: 4
      }} />
      {/* notificaton row */}
      <div style={{
        position: 'absolute',
        background: '#fff',
        top: highlight === 'badges' ? 190 : 170,
        left: highlight === 'badges' ? -20 : 0,
        right: highlight === 'badges' ? -20 : 0,
        height: 50,
        borderRadius: 4,
        boxShadow: highlight === 'badges'
          ? 'rgba(130, 126, 126, 0.27) 0px 3px 8px'
          : '0 0 0',
      }}>
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 15,
          left: highlight === 'badges' ? 30 : 100,
          width: highlight === 'badges' ? 160 : 120,
          height: 10,
          borderRadius: 50
        }} />
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 30,
          left: highlight === 'badges' ? 30 : 100,
          width: 50,
          height: 7,
          borderRadius: 50
        }} />
        <div style={{
          position: 'absolute',
          top: 12,
          left: 315,
          width: 30,
          height: 30
        }}>
          {highlight === 'badges' ? (
            <Icon.Hot shrink={1.1} />
          ) : (
            <div
              style={{
                background: '#f42839',
                height: 15,
                width: 15,
                marginTop: 5,
                borderRadius: '100%'
              }}
            />
          )}
        </div>
        <div style={{
          position: 'absolute',
          top: 12,
          left: 345,
          width: 30,
          height: 30
        }}>
          {highlight === 'badges' ? (
            <Icon.Convo shrink={1.1} />
          ) : (
            <div
              style={{
                background: '#009ef8',
                height: 15,
                width: 15,
                marginTop: 5,
                borderRadius: '100%'
              }}
            />
          )}
        </div>
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 20,
          right: 120,
          width: 100,
          height: 10,
          borderRadius: 50
        }} />
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 15,
          right: 20,
          width: 20,
          height: 20,
          borderRadius: '100%'
        }} />
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 15,
          right: 50,
          width: 20,
          height: 20,
          borderRadius: '100%'
        }} />
      </div>
      {/* notificaton row */}
      <div style={{
        position: 'absolute',
        background: '#fff',
        top: highlight === 'badges' ? 280 : 220,
        left: highlight === 'badges' ? -20 : 0,
        right: highlight === 'badges' ? -20 : 0,
        height: 50,
        borderRadius: 4,
        boxShadow: highlight === 'badges'
          ? 'rgba(130, 126, 126, 0.27) 0px 3px 8px'
          : '0 0 0',
      }}>
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 15,
          left: highlight === 'badges' ? 30 : 100,
          width: highlight === 'badges' ? 220 : 140,
          height: 10,
          borderRadius: 50
        }} />
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 30,
          left: highlight === 'badges' ? 30 : 100,
          width: 30,
          height: 7,
          borderRadius: 50
        }} />
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 30,
          left: highlight === 'badges' ? 64 : 134,
          width: 7,
          height: 7,
          borderRadius: '100%'
        }} />
        <div style={{
          position: 'absolute',
          top: 12,
          left: 330,
          width: 30,
          height: 30
        }}>
          {highlight === 'badges' ? (
            <Icon.Timer shrink={1.1} />
          ) : (
            <div
              style={{
                background: '#00d299',
                height: 15,
                width: 15,
                marginTop: 5,
                borderRadius: '100%'
              }}
            />
          )}
        </div>
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 20,
          right: 120,
          width: 100,
          height: 10,
          borderRadius: 50
        }} />
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 15,
          right: 20,
          width: 20,
          height: 20,
          borderRadius: '100%'
        }} />
        <div style={{
          position: 'absolute',
          background: '#dee1e6',
          top: 15,
          right: 50,
          width: 20,
          height: 20,
          borderRadius: '100%'
        }} />
      </div>
    </ImagePlaceholder>
  );
}

const Section = styled('div')({
  position: 'relative',
  width: '100%',
  minHeight: 300,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  margin: '28px auto 0',
  padding: '60px 0'
}, ({alt}) => alt && ({
  background: '#24292e',
  'p': {
    color: '#fff'
  },
  'h2': {
    color: '#fff'
  },
  '@media (max-width: 1000px)': {
    flexDirection: 'column'
  }
}));

const Item = styled('div')({
  flex: 1,
  display: 'block',
  padding: '24px 72px',
  'h2': {
    marginTop: 0,
    marginLeft: 15,
    fontSize: 42,
    textAlign: 'left',
    fontWeight: 600
  },
  'p': {
    fontSize: 18
  }
}, ({flex}) => ({
  flex
}));
const ItemText = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  margin: '20px 0',
  'p': {
    flex: .9,
    margin: 0
  },
  'div': {
    flex: .1,
    marginTop: 3
  },
});

const ImagePlaceholder = styled('div')({
  position: 'relative',
  display: 'block',
  height: 400,
  width: 600,
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(179, 179, 179, 0.25)'
  // '-webkit-mask-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)'
});

const Header = styled('h1')({
  color: '#fff',
  padding: '0 20px',
  margin: '0 auto 48px',
  letterSpacing: '-1.0px'
});

const SubHeader = styled(Header)({
  fontWeight: 500,
  maxWidth: 460,
  color: '#fff',
  fontSize: 24,
  marginBottom: 30,
  letterSpacing: '-0.25px'
});

const LandingHeader = styled('div')({
  position: 'relative',
  width: '100%',
  margin: '54px 20px 78px',
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
  fontWeight: '700',
  color: '#ffffff',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
});

const SmallText = styled('span')({
  fontSize: '12px',
  fontWeight: '500',
  color: '#ffffff',
});

const BottomLinkContainer = styled(LandingHeader)({
  maxWidth: 350,
  width: '100%',
  margin: '32px auto 0',
});

const LinkButton = styled('a')({});

const UnofficialReleaseTag = styled('span')({
  color: 'white',
  position: 'absolute',
  left: '44px',
  bottom: '7px',
  fontSize: '11px',
  background: '#f42839',
  fontWeight: '800',
  padding: '2px 4px',
  borderRadius: '4px',
  textTransform: 'uppercase',
});

export default function Scene ({loggedIn, onLogout, ...props}) {
  return (
    <div>
      <div className="container-gradient" style={{
        width: '100%',
        minHeight: 600,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <LandingHeader>
          <Logo size={75} />
          <UnofficialReleaseTag>beta</UnofficialReleaseTag>
          {loggedIn ? (
            <div className="button-container">
              <RouterLink style={{marginRight: 15}} to={routes.NOTIFICATIONS}>notifications</RouterLink>
              <LinkButton style={{marginRight: 15}} href="#" onClick={onLogout}>sign out</LinkButton>
            </div>
          ) : (
            <div className="button-container">
              <RouterLink style={{marginRight: 15}} to={routes.LOGIN}>sign in</RouterLink>
            </div>
          )}
        </LandingHeader>
        <LandingMessage>
          <Header>Control your GitHub notifications</Header>
          <SubHeader>Prioritize the tasks that keep you and your team most productive</SubHeader>
          <div className="button-container">
            <RouterLink to={routes.LOGIN}>let's get started</RouterLink>
          </div>
          <BottomLinkContainer>
            <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite">View and contribute on GitHub</SmallLink>
            <SmallText>
              <Icon.PeopleWhite
                shrink={0.55}
                style={{
                  display: 'inline-block',
                  top: -3,
                  right: -2
                }}
              />
              Free and open sourced
            </SmallText>
          </BottomLinkContainer>
        </LandingMessage>
        <Curve />
      </div>
      <Section id="section">
        <Item style={{flex: '0 0 2.5%', padding: 0}} />
        <Item>
          {createImagePlaceholder('badges')}
        </Item>
        <Item id="item-text">
          <h2>Surface the things that matter the most.</h2>
          <ItemText>
            <Icon.Ring />
            <p>The most important issues and pull requests that require your presence are called out and brought to your attention.</p>
          </ItemText>
          <ItemText>
            <Icon.Ear />
            <p>We listen for updates with your notifications and let you know <i>why</i> and <i>when</i> things change.</p>
          </ItemText>
          <ItemText>
            <Icon.Zap />
            <p>Super charge your day by focusing on getting things done, rather than sifting through notifications or emails.</p>
          </ItemText>
        </Item>
        <Item style={{flex: '0 0 2.5%', padding: 0}} />
      </Section>
      <Section id="section" alt={true} style={{paddingTop: 140, overflowX: 'hidden'}}>
        <Curve style={{
          bottom: 'auto',
          marginBottom: 0,
          marginTop: -1,
          top: 0,
          transform: 'translateX(-50%) rotate(180deg)'
        }} />
        <Item style={{flex: '0 0 2.5%', padding: 0}} />
        <Item id="item-text">
          <h2>Your time matters, so<br />we keep things simple.</h2>
          <ItemText>
            <Icon.CloudOffWhite />
            <p>All of the information we use to make your notifications more useful is kept offline and kept on your own computer.</p>
          </ItemText>
          <ItemText>
            <Icon.NoPhone />
            <p>Simply sign in and start working — no complicated or intrusive set up needed.</p>
          </ItemText>
          <ItemText>
            <Icon.NoMusic />
            <p>No distractions — we only show you updates on things that matter to you.</p>
          </ItemText>
        </Item>
        <Item>
          {createImagePlaceholder('reason')}
        </Item>
        <Item style={{flex: '0 0 2.5%', padding: 0}} />
      </Section>
    </div>
  );
};
