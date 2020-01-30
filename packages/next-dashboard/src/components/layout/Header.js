// @flow
import React, { useContext, type Node } from 'react';
import Link from 'next/link';

import DashboardContext from '../../utils/dashboardContext';
import HamburgerMenu from '../HamburgerMenu';

type Props = {
  toggleSidebarActive: () => void,
  sidebarActive: boolean,
  children: React$Node,
};

const getLogoURL = (conf: ?(string | { [string]: string }), theme: string) => {
  if (typeof conf === 'object' && conf !== null) {
    return conf[theme];
  }
  const imageName = `logo${theme !== 'default' ? `-${theme}` : ''}.png`;
  return `${conf || '/images'}/${imageName}`;
};

function Header({ toggleSidebarActive, sidebarActive, children }: Props): Node {
  const ctx = useContext(DashboardContext);
  if (ctx == null) throw new Error('Header: no dashboard context in scope');

  const theme = ctx.theme.class;

  const { logoURL: logoURLConf, homepageURL = '/', name } =
    ctx != null ? ctx.branding : {};
  const logoURL = getLogoURL(logoURLConf, theme);

  return (
    <header className="dashboard-header">
      <div className="header-content-container">
        <div className="grid grid-x3-medium grid-x4-large align-items-center">
          <div className="cell dashboard-header-cell dashboard-header-cell_sidebar">
            <HamburgerMenu
              sidebarActive={sidebarActive}
              toggleSidebarActive={toggleSidebarActive}
            />
          </div>
          <div className="cell dashboard-header-cell dashboard-header-cell_logo">
            <Link href={homepageURL}>
              <a className="dashboard-header-logo">
                <img src={logoURL} alt={name || 'Logo'} />
              </a>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;
