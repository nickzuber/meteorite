import React from 'react';
import { Link as RouterLink } from "@reach/router";
import styled from 'react-emotion';
import { routes } from '../../constants';
import Curve from '../../components/Curve';
import Icon from '../../components/Icon';
import Logo from '../../components/Logo';
import screenshot from '../../images/screenshot.png';
import rowExample from '../../images/row.png';
import '../../styles/gradient.css';

const hash = process.env.GIT_HASH ? `#${process.env.GIT_HASH}` : '';
const version = require('../../../package.json').version + hash;

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

const Arrow = ({style}) => {
  return (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" width="55" height="223" viewBox="0 0 55 223">
      <g fill="none" fill-rule="evenodd" stroke="rgb(0, 158, 248)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(1 -2)">
        <path stroke-dasharray="20 12 40" d="M51,8 C17,19.5689347 1.37247841e-11,46.42498 -5.70089572e-12,88.5681361 C-2.5121299e-11,130.711292 -2.32151849e-11,175.855247 1.74465369e-14,224"></path>
        <polyline points="41.584 12.035 48.584 4.035 55.584 12.035" transform="rotate(65 48.584 8.035)"></polyline>
      </g>
    </svg>
  );
}

const NotificationsRowExample = styled('div')({
  position: 'relative',
  height: 59,
  width: 745,
  borderRadius: 8,
  margin: '158px auto 124px',
  background: `url(${rowExample}) center center no-repeat`,
  backgroundSize: 'cover',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.51)',
});

const ImageContainer = styled('div')({
  position: 'absolute',
  height: 390,
  width: 685,
  top: 155,
  left: '50%',
  background: `url(${screenshot}) center center no-repeat`,
  backgroundSize: 'cover',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.51)',
  marginLeft: 100,
  borderRadius: 8,
  display: 'block',
  '@media (max-width: 1000px)': {
    display: 'none'
  }
});

const WidthContainer = styled('div')({
  margin: '0 auto',
  width: '100%',
  maxWidth: 1500,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
}, ({override = false}) => ({
  '@media (max-width: 1400px)': {
    flexDirection: override ? 'row' : 'column'
  }
}));

const Section = styled('div')({
  position: 'relative',
  width: '100%',
  minHeight: 300,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '28px auto 0',
  padding: '60px 0'
}, ({alt}) => alt && ({
  background: '#24292e',
  'p': {
    color: '#fff'
  },
  'h2': {
    color: '#fff',
    marginTop: 0,
    marginLeft: 15,
    fontSize: 42,
    textAlign: 'left',
    fontWeight: 600
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
  minWidth: 200,
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
  margin: '0 0 24px',
  letterSpacing: '-1.0px',
  width: '50%',
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
  width: '90%',
  margin: '22px 20px 54px',
  maxWidth: 1500,
  display: 'flex',
  justifyContent: 'space-between',
});

const LandingMessage = styled(LandingHeader)({
  marginLeft: '5%',
  flexDirection: 'column',
  textAlign: 'left',
  maxWidth: 1500,
  'h1': {
    display: 'block'
  },
  '@media (max-width: 1000px)': {
    textAlign: 'center',
    'h1': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 500
    },
    'div': {
      marginLeft: 'auto !important',
      marginRight: 'auto !important',
    },
  }
});

const SmallLink = styled('a')({
  cursor: 'pointer',
  fontSize: '12px',
  lineHeight: '18px',
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
  color: '#fff',
  'a': {
    color: 'rgba(255, 255, 255, .9)',
    fontWeight: 600,
    margin: '0 3px',
    textDecoration: 'none'
  },
  'a:hover': {
    color: 'rgba(255, 255, 255, 1)',
    textDecoration: 'underline'
  }
});

const BottomLinkContainer = styled(LandingHeader)({
  maxWidth: 350,
  width: '100%',
  margin: '32px 20px 0',
});

const LinkButton = styled('a')({});
const U = styled('span')({
  color: 'inherit',});
//   background: '#009cfb',
//   padding: '0 6px 2px',
//   borderRadius: 4,
// }, ({color}) => ({
//   background: color
// }));

const UnofficialReleaseTag = styled('span')({
  color: 'white',
  position: 'absolute',
  left: '44px',
  bottom: '9px',
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
        overflow: 'hidden',
        paddingBottom: 50
      }}>
        <LandingHeader style={{paddingLeft: '5%'}}>
          <Logo size={75}>
            <UnofficialReleaseTag>beta</UnofficialReleaseTag>
          </Logo>
          {loggedIn ? (
            <div className="button-container-alt">
              <RouterLink
                style={{
                  marginRight: 15,
                  color: '#fff',
                  background: 'none'
                }} to={routes.NOTIFICATIONS}>notifications</RouterLink>
              <LinkButton
                style={{
                  marginRight: 15,
                  color: '#fff',
                  background: 'none'
                }} href="#" onClick={onLogout}>sign out</LinkButton>
            </div>
          ) : (
            <div className="button-container-alt">
              <RouterLink
                style={{
                  marginRight: 15,
                  color: '#fff',
                  background: 'none'
                }} to={routes.LOGIN}>sign in</RouterLink>
            </div>
          )}
        </LandingHeader>
        <LandingMessage>
          <Header>Control your GitHub notifications</Header>
          <SubHeader>Prioritize the tasks that keep you and your team most productive</SubHeader>
          <div className="button-container-alt" style={{marginLeft: 20}}>
            <RouterLink to={routes.LOGIN}>let's get started</RouterLink>
            <LinkButton
              onClick={() => {
                const section = document.querySelector('#learnMore');
                const y = section.getBoundingClientRect().top + window.scrollY;
                window.scroll({
                  top: y,
                  behavior: 'smooth'
                });
              }}
              style={{
                marginLeft: 20,
                color: '#fff',
                background: 'none'
            }}>
              learn more
              <Icon.LeftArrow shrink={0.6} style={{marginLeft: 5, filter: 'invert(1)', transform: 'rotateY(180deg)'}} />
            </LinkButton>
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
        <ImageContainer />
        <Curve />
      </div>
      <Section className="section">
        <WidthContainer>
          <Item style={{flex: '0 0 2.5%', padding: 0}} />
          <Item>
            {createImagePlaceholder('badges')}
          </Item>
          <Item className="item-text">
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
        </WidthContainer>
      </Section>
      <Section className="section" alt={true} style={{paddingTop: 140, overflowX: 'hidden'}}>
        <Curve style={{
          bottom: 'auto',
          marginBottom: 0,
          marginTop: -1,
          top: 0,
          transform: 'translateX(-50%) rotate(180deg)'
        }} />
        <WidthContainer>
          <Item style={{flex: '0 0 2.5%', padding: 0}} />
          <Item className="item-text">
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
        </WidthContainer>
      </Section>
      <Section id="learnMore" className="section" alt={true} style={{marginTop: 0, paddingBottom: 100}}>
        <h2 style={{textAlign: 'center', maxWidth: 900, color: '#fff'}}>
          Meteorite is an assistant for your <br />GitHub notifications.
        </h2>
        <WidthContainer>
          <Item style={{flex: '0 0 2.5%', padding: 0}} />
          <Item className="item-text">
            <ItemText>
              <Icon.Rank style={{filter: 'invert(1)'}} />
              <p>Scores your notifications based on their importance, so we can surface the most critical updates at the top of your queue.</p>
            </ItemText>
            <ItemText>
              <Icon.Sync style={{filter: 'invert(1)'}} />
              <p>Provides you with quick context for why you're receiving each notification.</p>
            </ItemText>
            <ItemText>
              <Icon.NotificationsOn style={{filter: 'invert(1)'}} />
              <p>Allows you to opt in for web notifications whenever you recieve important update to help notify you right away.</p>
            </ItemText>
          </Item>
          <Item className="item-text">
            <ItemText>
              <Icon.Shield style={{filter: 'invert(1)'}} />
              <p>Protects you from useless spammy notifications that you don't care about.</p>
            </ItemText>
            <ItemText>
              <Icon.Headphones style={{filter: 'invert(1)'}} />
              <p>Let's you focus in on specific types of notifications that matter to you, like when your review is requested for a pull request or you were assigned an issue.</p>
            </ItemText>
            <ItemText>
              <Icon.Bubbles style={{filter: 'invert(1)'}} />
              <p>Unlocks dope statistics that help you understand how you interact with notifications on a daily basis.</p>
            </ItemText>
          </Item>
          <Item style={{flex: '0 0 2.5%', padding: 0}} />
        </WidthContainer>
        <NotificationsRowExample>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            marginTop: -85,
            marginLeft: 20,
            display: 'block',
          }}>
            <Arrow style={{
              position: 'absolute',
              transform: 'rotate(90deg)',
              marginTop: '-65px',
              marginLeft: '480px',
              left: 0,
              top: 0,
            }} />
            <SmallText className="hover" style={{
              fontWeight: 600,
              borderRadius: 4,
              padding: '12px 24px',
              background: 'rgb(0, 158, 248)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.51)',
            }}>Calculated score based on this issue's importance to you</SmallText>
          </div>
          <div style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            marginBottom: -80,
            marginRight: 20,
            display: 'block',
          }}>
            <Arrow style={{
              position: 'absolute',
              transform: 'rotate(270deg)',
              marginBottom: '-70px',
              marginLeft: '-160px',
              left: 0,
              bottom: 0,
            }} />
            <SmallText className="hover" style={{
              fontWeight: 600,
              borderRadius: 4,
              padding: '12px 24px',
              background: 'rgb(0, 158, 248)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.51)',
            }}>The reason you just got this notification</SmallText>
          </div>
        </NotificationsRowExample>
        <div className="button-container" style={{marginTop: 100 - 24}}>
          <RouterLink to={routes.LOGIN}>sign in and try it out</RouterLink>
          <LinkButton
            style={{
              marginLeft: 15,
              color: '#fff',
              background: 'none'
            }} href="https://github.com/nickzuber/meteorite/">check out the github</LinkButton>
        </div>
      </Section>
      <Section alt={true} style={{
        marginTop: 0,
        minHeight: 100,
        justifyContent: 'center',
        paddingBottom: 28,
        paddingTop: 28,
        background: '#212629',
      }}>
        <WidthContainer override={true} style={{alignItems: 'flex-end'}}>
          <Item style={{flex: '0 0 2.5%', padding: 0}} />
          <Item style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: 20
          }}>
            <Logo size={50} style={{marginBottom: 18}} />
            <SmallText style={{color: 'rgba(255, 255, 255, .75)'}}>
              Created by
              <a target="_blank" href="https://nickzuber.com/">
                Nick Zuber
              </a>
              and
              <a target="_blank" href="https://github.com/nickzuber/meteorite/graphs/contributors/">
                contributors
              </a>
              <br />
              Home page inspiration from
              <a target="_blank" href="https://robinpowered.com/">
                Robin
              </a>
              and
              <a target="_blank" href="https://getkap.co/">
                Kap
              </a>
              <br />
              <a target="_blank" href="https://github.com/nickzuber/meteorite/" style={{marginLeft: 0}}>
                Source
              </a>
              available under
              <a target="_blank" href="https://github.com/nickzuber/meteorite/blob/master/LICENSE/">
                MIT
              </a>
            </SmallText>
          </Item>
          <Item style={{textAlign: 'right'}} className="footer-links">
            <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite/" style={{marginLeft: 28}}>Source code</SmallLink>
            <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite/issues" style={{marginLeft: 28}}>Submit feedback</SmallLink>
            <SmallLink target="_blank" href="https://github.com/nickzuber/meteorite/issues" style={{marginLeft: 28}}>Bug reports</SmallLink>
            <SmallText style={{marginLeft: 28, opacity: .25}}>v{version}</SmallText>
          </Item>
          <Item style={{flex: '0 0 2.5%', padding: 0}} />
        </WidthContainer>
      </Section>
    </div>
  );
};
