export type HamburgerProps = {
  open: boolean;
  handleClose: () => void;
  menuLinks: { label: string; url: string }[];
};

type Sublinks = {
  label: string;
  icon: any;
  subUrl: string;
};

export type SubmenuProps = {
  open: any;
  handleClose: () => void;
  menuLinks: {
    label: string;
    sublinks?: Sublinks[];
    url: string;
  }[];
};
