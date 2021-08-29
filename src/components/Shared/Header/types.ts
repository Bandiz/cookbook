type Sublinks = {
  label: string;
  icon: any;
  subUrl: string;
};

export type HamburgerProps = {
  open: boolean;
  handleClose: () => void;
  menuLinks: { label: string; sublinks?: Sublinks[]; url: string }[];
};

export type SubmenuProps = {
  handleClose?: () => void;
  menuLinks: {
    label: string;
    sublinks?: Sublinks[];
    url: string;
  }[];
};
