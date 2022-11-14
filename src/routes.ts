// ----------------------------------------------------------------------

const Routes = {
  // Marketing
  company: {
    list: "/company",
    detail: (slug: any) => `/company/${slug}`,
  },
  job: {
    list: "/job",
    detail: (slug: any) => `/job/${slug}`,
  },
  auth: {
    login: "/login",
    register: "/register",
  },
  // Common
  home: "/",
  create: "/create",
  404: "*",
};

export default Routes;
