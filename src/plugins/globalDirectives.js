import { directive as vClickOutside } from "vue-clickaway";

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install(Vue) {
    Vue.directive("click-outside", vClickOutside);

    Vue.reqFetch = async (method, url, headers, body) => {
      const req = {method: method}
      if(body !== undefined){
        if(body instanceof FormData)
          req.body = body
        else
          req.body = JSON.stringify(body)
      }
      if(headers !== undefined) req.headers = headers

      try{
        console.log(req)
        const res = await fetch(url, req);

        if(res.ok){
          if(res.status === 204)
            return await res.text()
          else
            return await res.json()
        }
        else
          throw new Error(`Error : ${res.status} - ${await res.text()}`)
      } catch(err) {
        throw new Error(err)
      }
    };

    Vue.createCookie = (name, value, dayExpiracy, path = '/') => {
      const now = new Date()
      now.setTime(now.getTime() + dayExpiracy*24*60*60*1000)
      document.cookie = `${name}=${value}; path='${path}'; expires=${now.toUTCString()}`
      /*const expiracy = new Date()
      expiracy.setTime(expiracy.getTime() + dayExpiracy * 24 * 60 * 60 * 1000)
      document.cookie = `${name}=${value}; expires=${expiracy.toUTCString}; path=${path}`*/
    };

    Vue.getCookie = (name) => {
      const cookies = document.cookie.split('; ')
      const cookie = cookies.find(cki => cki.startsWith(name + '='))
      return cookie ? cookie.split('=')[1] : null
    };

    Vue.removeCookie = (name, path = '/') => {
      document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 UTC`
    }
  },
};

export default GlobalDirectives;
