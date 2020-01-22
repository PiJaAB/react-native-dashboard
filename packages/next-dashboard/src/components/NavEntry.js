// @flow

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import logger from '../utils/logger';

type Props = {
  href?: string,
  as?: string,
  children: React$Node,
  icon?: React$Node,
  onClick?: (ev: MouseEvent) => ?boolean,
  active?: boolean,
  raw?: boolean,
};

type LinkProps = {
  href: $PropertyType<Props, 'href'>,
  onClick: ?$PropertyType<Props, 'onClick'>,
  as: ?$PropertyType<Props, 'as'>,
  children: React$Node,
  active: $PropertyType<Props, 'active'>,
  icon: ?$PropertyType<Props, 'icon'>,
};

type ButtonProps = {
  children: React$Node,
  onClick: ?$PropertyType<Props, 'onClick'>,
  active: $PropertyType<Props, 'active'>,
  icon: ?$PropertyType<Props, 'icon'>,
  as: ?$PropertyType<Props, 'as'>,
};

type PropsRaw = {
  children: React$Node,
  onClick: ?$PropertyType<Props, 'onClick'>,
  href: ?$PropertyType<Props, 'href'>,
  icon: ?$PropertyType<Props, 'icon'>,
  as: ?$PropertyType<Props, 'as'>,
};

type InnerProps = {
  children: React$Node,
  icon?: $PropertyType<Props, 'icon'>,
};

function Inner({ icon, children }: InnerProps): React$Node {
  return (
    <>
      {icon != null &&
        (typeof icon === 'string' ? (
          <span
            className={`dashboard-sidebar-menu-item-button-icon fa fa-${icon}`}
          />
        ) : (
          icon
        ))}
      <span className="dashboard-sidebar-menu-item-button-text">
        {children}
      </span>
    </>
  );
}

Inner.defaultProps = {
  icon: undefined,
};

function LinkEl({
  href,
  as,
  children,
  active,
  onClick,
  icon,
}: LinkProps): React$Element<Link> {
  if (onClick) {
    logger.debug(
      '`onClick` not supported with href. If you need both, use raw render.',
    );
  }
  return (
    <Link href={href} as={as}>
      <a
        className={[
          'button',
          'dashboard-sidebar-menu-item-button',
          active && 'dashboard-sidebar-menu-item-button_active',
        ]
          .filter(c => c)
          .join(' ')}
      >
        <Inner icon={icon}>{children}</Inner>
      </a>
    </Link>
  );
}

function ButtonEl({
  children,
  onClick,
  active,
  icon,
  as,
}: ButtonProps): React$Element<'button'> {
  if (as) {
    logger.debug('`as` makes no sense without href.');
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'button',
        'dashboard-sidebar-menu-item-button',
        active && 'dashboard-sidebar-menu-item-button_active',
      ]
        .filter(c => c)
        .join(' ')}
    >
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}

function RawEl({ children, onClick, href, icon, as }: PropsRaw): React$Node {
  if (onClick || href || icon || as) {
    logger.debug(
      '`onClick`, `href`, `icon`, `as` unsupported during raw render.',
    );
  }
  return children;
}

export default function NavEntry({
  href,
  children,
  icon,
  as,
  active: propActive,
  raw,
  onClick,
}: Props): React$Node {
  const router = useRouter();
  const active = propActive == null ? href === router.pathname : propActive;
  let Element = ButtonEl;
  if (href) Element = LinkEl;
  if (raw) Element = RawEl;
  return (
    <div className="dashboard-sidebar-menu-item" key={href}>
      <Element
        active={active}
        href={href}
        icon={icon}
        as={as}
        onClick={onClick}
      >
        {children}
      </Element>
    </div>
  );
}

NavEntry.defaultProps = {
  href: undefined,
  icon: undefined,
  as: undefined,
  onClick: undefined,
  active: undefined,
  raw: false,
};
