export const DEFAULT_LANG_ID = 'python';

const read_hash = () => window.location.hash.substring(1);

// TODO - use an actual router...

export const LangRouter = {
  format: id => `#${id}`,
  get: (langs, no_default_id) => {
    let default_id = no_default_id === true ? undefined : DEFAULT_LANG_ID;
    let hash = read_hash();
    return langs.find(x => x.id === hash) ? hash : default_id;
  },
  go: id => {
    window.location = LangRouter.format(id);
  }
};

export const ConvertRouter = {
  format: id => `#transcode/${id}`,
  get: (langs, no_default_id) => {
    let default_id = no_default_id === true ? undefined : DEFAULT_LANG_ID;
    let hash = read_hash();
    let sp = hash.split('/');

    if (sp.length <= 2 && sp[0] === 'transcode') {
      let id = sp[1] && langs.find(x => x.id === sp[1]) ? sp[1] : default_id;

      return id;
    }

    return undefined;
  },
  go: id => {
    window.location = ConvertRouter.format(id);
  }
};

export const ALL_ROUTERS = [LangRouter, ConvertRouter];

export const getLangId = langs => {
  let lang_id;
  for (let router of ALL_ROUTERS) {
    lang_id = router.get(langs, true);
    if (lang_id) {
      return lang_id;
    }
  }
  return DEFAULT_LANG_ID;
};
