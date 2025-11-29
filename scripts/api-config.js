window.API_CONFIG = {
  backend: "https://betsense-backend.onrender.com",

  endpoints: {
    nsi: {
      demo: "/api/nsi/demo-analyze",
      health: "/api/nsi/health"
    },

    rbs: {
      demo: "/api/rbs/demo-analyze",
      health: "/api/rbs/health"
    },

    fusion: {
      demo: "/api/fusion/demo-analyze",
      health: "/api/fusion/health"
    },

    emotion: {
      demo: "/api/emotion/demo-analyze",
      health: "/api/emotion/health"
    }
  }
};
