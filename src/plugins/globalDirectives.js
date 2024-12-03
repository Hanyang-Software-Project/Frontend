import { directive as vClickOutside } from "vue-clickaway";

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install(Vue) {
    Vue.directive("click-outside", vClickOutside);

    Vue.reqFetch = async (method, url, body, headers, onErr = (err) => console.log(err)) => {
      const req = {method: method}
      if(body !== undefined) req.body = JSON.stringify(body)
      if(headers !== undefined) req.headers = headers

      try{
        const res = await fetch(url, req);

        if(res.ok)
          return await res.json()
        else
          throw new Error(`Error : ${res.status} - ${await res.text()}`)
      } catch(err) {
        onErr(err)
      }
    }
  },
};

export default GlobalDirectives;
