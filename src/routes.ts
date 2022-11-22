// ----------------------------------------------------------------------

const Routes = {
  company: {
    detail: (slug: any) => `/company/${slug}`,
  },
  job: {
    detail: (slug: any) => `/job/${slug}`,
  },
  auth: {
    login: "/login",
    register: "/register",
  },
  home: "/",
  create: "/create",
  404: "*",
};

export default Routes;
