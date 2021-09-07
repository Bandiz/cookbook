type Sublinks = {
    label: string;
    icon: any;
};

export type HamburgerProps = {
    open: boolean;
    handleClose: () => void;
    menuLinks: { label: string; sublinks?: Sublinks[]; url: string }[];
    categories: string[];
};
