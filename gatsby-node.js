// utils
const axios = require("axios");

const path = require("path");

const { replace: shortCodeReplace } = require("@wordpress/shortcode");

// components
const pageTemplate = path.resolve("./src/templates/PageComponent.js");

exports.createPages = async ({ actions: { createPage } }) => {
  let apiResponse, pagesData = [], configuration, menuData = [], footerContent = "";
  let baseUrl = process.env.REACT_APP_ADMIN_BASE_URI;
  let projectId = process.env.REACT_APP_ADMIN_PROJECT_ID;
  let menuIds = process.env.REACT_APP_ADMIN_MENU_ID;

  if (baseUrl && projectId) {
    try {
      apiResponse = await axios.get(`${baseUrl}pages/list`, { params: { projectId } });
    }
    catch (e) { console.log(e); }
  }
  else console.log("Environment variables are not available.");

  if (Array.isArray(apiResponse?.data?.data)) {
    pagesData = apiResponse.data.data;
    configuration = apiResponse.data.configuration || {};
    if (configuration.footer)
      footerContent = shortCodeReplace("rlink", configuration.footer, ({ attrs: { named } }) => {
        if (named.id) {
          let elementStr = "<rlink";
          Object.entries(named).forEach(([key, val]) => (!(key && val) || (elementStr += ` ${key}=${val}`)));
          return `${elementStr} />`;
        }
      });

    if (menuIds) {
      let menuApiResponse;
      
      try {
        menuApiResponse = await axios.post(`${baseUrl}menus/list`, { projectId, menu: menuIds.split(",") });
      }
      catch (e) { console.log(e); }

      if (Array.isArray(menuApiResponse?.data))
        menuData = menuApiResponse.data.map(item => ({
          ...item,
          data: Array.isArray(item?.data) ? item.data.map(value => ({
            ...value,
            link: typeof value?.link === "string" ? value.link.trim().replace(/^\/+|\/+$/g, "") : ""
          })) : []
        }))
    }
  }

  for (const { content, keywords, meta_description, meta_title, slug } of pagesData) {
    const [pageContent, componentIds, hasIds] = replaceTags(content);
    let componentsData = {};
    if (hasIds) {
      let pageApiResponse;

      try {
        pageApiResponse = await axios.post(`${baseUrl}page-data`, { projectId, ...componentIds });
      }
      catch (e) { console.log(e); }

      if (pageApiResponse?.data) {
        pageApiResponseData = pageApiResponse.data;
        if (Array.isArray(pageApiResponseData.accordion))
          pageApiResponseData.accordion.forEach(item => { componentsData[`accordion_${item.id}`] = item; });
        if (Array.isArray(pageApiResponseData.menu))
          pageApiResponseData.menu.forEach(item => { componentsData[`menu_${item.id}`] = item; });
        if (Array.isArray(pageApiResponseData.slider))
          pageApiResponseData.slider.forEach(item => { componentsData[`slider_${item.id}`] = item; });
        if (Array.isArray(pageApiResponseData.tab))
          pageApiResponseData.tab.forEach(item => { componentsData[`tab_${item.id}`] = item; });
      }
    }

    createPage({
      path: slug,
      component: pageTemplate,
      context: {
        seo: {
          title: meta_title || configuration.meta_title || "",
          description: meta_description || configuration.meta_description || "",
          keywords: keywords || configuration.keywords || ""
        },
        menuData: menuData,
        pageData: componentsData,
        content: pageContent || "",
        footerContent
      }
    });
  }

}
const replaceTags = (content) => {
  let componentIds = {
    accordion: [],
    menu: [],
    slider: [],
    tab: [],
  }, hasIds = false;

  let newContent = shortCodeReplace("accordion", content, ({ attrs: { named } }) => {
    if (named.id) {
      let elementStr = "<accordion";
      Object.entries(named).forEach(([key, val]) => (!(key && val) || (elementStr += ` ${key}=${val}`)));
      componentIds.accordion.push(named.id);
      return `${elementStr} />`;
    }
  });

  newContent = shortCodeReplace("menu", newContent, ({ attrs: { named } }) => {
    if (named.id) {
      let elementStr = "<menu";
      Object.entries(named).forEach(([key, val]) => (!(key && val) || (elementStr += ` ${key}=${val}`)));
      componentIds.menu.push(named.id);
      return `${elementStr} />`;
    }
  });

  newContent = shortCodeReplace("slider", newContent, ({ attrs: { named } }) => {
    if (named.id) {
      let elementStr = "<slider";
      Object.entries(named).forEach(([key, val]) => (!(key && val) || (elementStr += ` ${key}=${val}`)));
      componentIds.slider.push(named.id);
      return `${elementStr} />`;
    }
  });

  newContent = shortCodeReplace("tab", newContent, ({ attrs: { named } }) => {
    if (named.id) {
      let elementStr = "<tab";
      Object.entries(named).forEach(([key, val]) => (!(key && val) || (elementStr += ` ${key}=${val}`)));
      componentIds.tab.push(named.id);
      return `${elementStr} />`;
    }
  });

  newContent = shortCodeReplace("rlink", newContent, ({ attrs: { named } }) => {
    if (named.id) {
      let elementStr = "<rlink";
      Object.entries(named).forEach(([key, val]) => (!(key && val) || (elementStr += ` ${key}=${val}`)));
      return `${elementStr} />`;
    }
  });

  if (componentIds.accordion.length || componentIds.menu.length || componentIds.slider.length || componentIds.tab.length)
    hasIds = true;

  return [newContent, componentIds, hasIds];
};
