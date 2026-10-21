"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/tldts@6.1.86/node_modules/tldts/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/tldts@6.1.86/node_modules/tldts/dist/cjs/index.js"(exports2) {
    "use strict";
    function shareSameDomainSuffix(hostname, vhost) {
      if (hostname.endsWith(vhost)) {
        return hostname.length === vhost.length || hostname[hostname.length - vhost.length - 1] === ".";
      }
      return false;
    }
    function extractDomainWithSuffix(hostname, publicSuffix) {
      const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
      const lastDotBeforeSuffixIndex = hostname.lastIndexOf(".", publicSuffixIndex);
      if (lastDotBeforeSuffixIndex === -1) {
        return hostname;
      }
      return hostname.slice(lastDotBeforeSuffixIndex + 1);
    }
    function getDomain$1(suffix, hostname, options) {
      if (options.validHosts !== null) {
        const validHosts = options.validHosts;
        for (const vhost of validHosts) {
          if (
            /*@__INLINE__*/
            shareSameDomainSuffix(hostname, vhost)
          ) {
            return vhost;
          }
        }
      }
      let numberOfLeadingDots = 0;
      if (hostname.startsWith(".")) {
        while (numberOfLeadingDots < hostname.length && hostname[numberOfLeadingDots] === ".") {
          numberOfLeadingDots += 1;
        }
      }
      if (suffix.length === hostname.length - numberOfLeadingDots) {
        return null;
      }
      return (
        /*@__INLINE__*/
        extractDomainWithSuffix(hostname, suffix)
      );
    }
    function getDomainWithoutSuffix$1(domain, suffix) {
      return domain.slice(0, -suffix.length - 1);
    }
    function extractHostname(url, urlIsValidHostname) {
      let start = 0;
      let end = url.length;
      let hasUpper = false;
      if (!urlIsValidHostname) {
        if (url.startsWith("data:")) {
          return null;
        }
        while (start < url.length && url.charCodeAt(start) <= 32) {
          start += 1;
        }
        while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
          end -= 1;
        }
        if (url.charCodeAt(start) === 47 && url.charCodeAt(start + 1) === 47) {
          start += 2;
        } else {
          const indexOfProtocol = url.indexOf(":/", start);
          if (indexOfProtocol !== -1) {
            const protocolSize = indexOfProtocol - start;
            const c0 = url.charCodeAt(start);
            const c1 = url.charCodeAt(start + 1);
            const c2 = url.charCodeAt(start + 2);
            const c3 = url.charCodeAt(start + 3);
            const c4 = url.charCodeAt(start + 4);
            if (protocolSize === 5 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112 && c4 === 115) ;
            else if (protocolSize === 4 && c0 === 104 && c1 === 116 && c2 === 116 && c3 === 112) ;
            else if (protocolSize === 3 && c0 === 119 && c1 === 115 && c2 === 115) ;
            else if (protocolSize === 2 && c0 === 119 && c1 === 115) ;
            else {
              for (let i = start; i < indexOfProtocol; i += 1) {
                const lowerCaseCode = url.charCodeAt(i) | 32;
                if (!(lowerCaseCode >= 97 && lowerCaseCode <= 122 || // [a, z]
                lowerCaseCode >= 48 && lowerCaseCode <= 57 || // [0, 9]
                lowerCaseCode === 46 || // '.'
                lowerCaseCode === 45 || // '-'
                lowerCaseCode === 43)) {
                  return null;
                }
              }
            }
            start = indexOfProtocol + 2;
            while (url.charCodeAt(start) === 47) {
              start += 1;
            }
          }
        }
        let indexOfIdentifier = -1;
        let indexOfClosingBracket = -1;
        let indexOfPort = -1;
        for (let i = start; i < end; i += 1) {
          const code = url.charCodeAt(i);
          if (code === 35 || // '#'
          code === 47 || // '/'
          code === 63) {
            end = i;
            break;
          } else if (code === 64) {
            indexOfIdentifier = i;
          } else if (code === 93) {
            indexOfClosingBracket = i;
          } else if (code === 58) {
            indexOfPort = i;
          } else if (code >= 65 && code <= 90) {
            hasUpper = true;
          }
        }
        if (indexOfIdentifier !== -1 && indexOfIdentifier > start && indexOfIdentifier < end) {
          start = indexOfIdentifier + 1;
        }
        if (url.charCodeAt(start) === 91) {
          if (indexOfClosingBracket !== -1) {
            return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
          }
          return null;
        } else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
          end = indexOfPort;
        }
      }
      while (end > start + 1 && url.charCodeAt(end - 1) === 46) {
        end -= 1;
      }
      const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
      if (hasUpper) {
        return hostname.toLowerCase();
      }
      return hostname;
    }
    function isProbablyIpv4(hostname) {
      if (hostname.length < 7) {
        return false;
      }
      if (hostname.length > 15) {
        return false;
      }
      let numberOfDots = 0;
      for (let i = 0; i < hostname.length; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46) {
          numberOfDots += 1;
        } else if (code < 48 || code > 57) {
          return false;
        }
      }
      return numberOfDots === 3 && hostname.charCodeAt(0) !== 46 && hostname.charCodeAt(hostname.length - 1) !== 46;
    }
    function isProbablyIpv6(hostname) {
      if (hostname.length < 3) {
        return false;
      }
      let start = hostname.startsWith("[") ? 1 : 0;
      let end = hostname.length;
      if (hostname[end - 1] === "]") {
        end -= 1;
      }
      if (end - start > 39) {
        return false;
      }
      let hasColon = false;
      for (; start < end; start += 1) {
        const code = hostname.charCodeAt(start);
        if (code === 58) {
          hasColon = true;
        } else if (!(code >= 48 && code <= 57 || // 0-9
        code >= 97 && code <= 102 || // a-f
        code >= 65 && code <= 90)) {
          return false;
        }
      }
      return hasColon;
    }
    function isIp(hostname) {
      return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
    }
    function isValidAscii(code) {
      return code >= 97 && code <= 122 || code >= 48 && code <= 57 || code > 127;
    }
    function isValidHostname(hostname) {
      if (hostname.length > 255) {
        return false;
      }
      if (hostname.length === 0) {
        return false;
      }
      if (
        /*@__INLINE__*/
        !isValidAscii(hostname.charCodeAt(0)) && hostname.charCodeAt(0) !== 46 && // '.' (dot)
        hostname.charCodeAt(0) !== 95
      ) {
        return false;
      }
      let lastDotIndex = -1;
      let lastCharCode = -1;
      const len = hostname.length;
      for (let i = 0; i < len; i += 1) {
        const code = hostname.charCodeAt(i);
        if (code === 46) {
          if (
            // Check that previous label is < 63 bytes long (64 = 63 + '.')
            i - lastDotIndex > 64 || // Check that previous character was not already a '.'
            lastCharCode === 46 || // Check that the previous label does not end with a '-' (dash)
            lastCharCode === 45 || // Check that the previous label does not end with a '_' (underscore)
            lastCharCode === 95
          ) {
            return false;
          }
          lastDotIndex = i;
        } else if (!/*@__INLINE__*/
        (isValidAscii(code) || code === 45 || code === 95)) {
          return false;
        }
        lastCharCode = code;
      }
      return (
        // Check that last label is shorter than 63 chars
        len - lastDotIndex - 1 <= 63 && // Check that the last character is an allowed trailing label character.
        // Since we already checked that the char is a valid hostname character,
        // we only need to check that it's different from '-'.
        lastCharCode !== 45
      );
    }
    function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, extractHostname: extractHostname2 = true, mixedInputs = true, validHosts = null, validateHostname = true }) {
      return {
        allowIcannDomains,
        allowPrivateDomains,
        detectIp,
        extractHostname: extractHostname2,
        mixedInputs,
        validHosts,
        validateHostname
      };
    }
    var DEFAULT_OPTIONS = (
      /*@__INLINE__*/
      setDefaultsImpl({})
    );
    function setDefaults(options) {
      if (options === void 0) {
        return DEFAULT_OPTIONS;
      }
      return (
        /*@__INLINE__*/
        setDefaultsImpl(options)
      );
    }
    function getSubdomain$1(hostname, domain) {
      if (domain.length === hostname.length) {
        return "";
      }
      return hostname.slice(0, -domain.length - 1);
    }
    function getEmptyResult() {
      return {
        domain: null,
        domainWithoutSuffix: null,
        hostname: null,
        isIcann: null,
        isIp: null,
        isPrivate: null,
        publicSuffix: null,
        subdomain: null
      };
    }
    function resetResult(result) {
      result.domain = null;
      result.domainWithoutSuffix = null;
      result.hostname = null;
      result.isIcann = null;
      result.isIp = null;
      result.isPrivate = null;
      result.publicSuffix = null;
      result.subdomain = null;
    }
    function parseImpl(url, step, suffixLookup2, partialOptions, result) {
      const options = (
        /*@__INLINE__*/
        setDefaults(partialOptions)
      );
      if (typeof url !== "string") {
        return result;
      }
      if (!options.extractHostname) {
        result.hostname = url;
      } else if (options.mixedInputs) {
        result.hostname = extractHostname(url, isValidHostname(url));
      } else {
        result.hostname = extractHostname(url, false);
      }
      if (step === 0 || result.hostname === null) {
        return result;
      }
      if (options.detectIp) {
        result.isIp = isIp(result.hostname);
        if (result.isIp) {
          return result;
        }
      }
      if (options.validateHostname && options.extractHostname && !isValidHostname(result.hostname)) {
        result.hostname = null;
        return result;
      }
      suffixLookup2(result.hostname, options, result);
      if (step === 2 || result.publicSuffix === null) {
        return result;
      }
      result.domain = getDomain$1(result.publicSuffix, result.hostname, options);
      if (step === 3 || result.domain === null) {
        return result;
      }
      result.subdomain = getSubdomain$1(result.hostname, result.domain);
      if (step === 4) {
        return result;
      }
      result.domainWithoutSuffix = getDomainWithoutSuffix$1(result.domain, result.publicSuffix);
      return result;
    }
    function fastPathLookup(hostname, options, out) {
      if (!options.allowPrivateDomains && hostname.length > 3) {
        const last = hostname.length - 1;
        const c3 = hostname.charCodeAt(last);
        const c2 = hostname.charCodeAt(last - 1);
        const c1 = hostname.charCodeAt(last - 2);
        const c0 = hostname.charCodeAt(last - 3);
        if (c3 === 109 && c2 === 111 && c1 === 99 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "com";
          return true;
        } else if (c3 === 103 && c2 === 114 && c1 === 111 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "org";
          return true;
        } else if (c3 === 117 && c2 === 100 && c1 === 101 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "edu";
          return true;
        } else if (c3 === 118 && c2 === 111 && c1 === 103 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "gov";
          return true;
        } else if (c3 === 116 && c2 === 101 && c1 === 110 && c0 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "net";
          return true;
        } else if (c3 === 101 && c2 === 100 && c1 === 46) {
          out.isIcann = true;
          out.isPrivate = false;
          out.publicSuffix = "de";
          return true;
        }
      }
      return false;
    }
    var exceptions = /* @__PURE__ */ (function() {
      const _0 = [1, {}], _1 = [2, {}], _2 = [0, { "city": _0 }];
      const exceptions2 = [0, { "ck": [0, { "www": _0 }], "jp": [0, { "kawasaki": _2, "kitakyushu": _2, "kobe": _2, "nagoya": _2, "sapporo": _2, "sendai": _2, "yokohama": _2 }], "dev": [0, { "hrsn": [0, { "psl": [0, { "wc": [0, { "ignored": _1, "sub": [0, { "ignored": _1 }] }] }] }] }] }];
      return exceptions2;
    })();
    var rules = /* @__PURE__ */ (function() {
      const _3 = [1, {}], _4 = [2, {}], _5 = [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], _6 = [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], _7 = [0, { "*": _4 }], _8 = [2, { "s": _7 }], _9 = [0, { "relay": _4 }], _10 = [2, { "id": _4 }], _11 = [1, { "gov": _3 }], _12 = [0, { "transfer-webapp": _4 }], _13 = [0, { "notebook": _4, "studio": _4 }], _14 = [0, { "labeling": _4, "notebook": _4, "studio": _4 }], _15 = [0, { "notebook": _4 }], _16 = [0, { "labeling": _4, "notebook": _4, "notebook-fips": _4, "studio": _4 }], _17 = [0, { "notebook": _4, "notebook-fips": _4, "studio": _4, "studio-fips": _4 }], _18 = [0, { "*": _3 }], _19 = [1, { "co": _4 }], _20 = [0, { "objects": _4 }], _21 = [2, { "nodes": _4 }], _22 = [0, { "my": _7 }], _23 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-website": _4 }], _24 = [0, { "s3": _4, "s3-accesspoint": _4 }], _25 = [0, { "direct": _4 }], _26 = [0, { "webview-assets": _4 }], _27 = [0, { "vfs": _4, "webview-assets": _4 }], _28 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _29 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _24, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _30 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], _31 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4 }], _32 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-website": _4 }], _33 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": _27 }], _34 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-deprecated": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], _35 = [0, { "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4 }], _36 = [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _35, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4 }], _37 = [0, { "auth": _4 }], _38 = [0, { "auth": _4, "auth-fips": _4 }], _39 = [0, { "auth-fips": _4 }], _40 = [0, { "apps": _4 }], _41 = [0, { "paas": _4 }], _42 = [2, { "eu": _4 }], _43 = [0, { "app": _4 }], _44 = [0, { "site": _4 }], _45 = [1, { "com": _3, "edu": _3, "net": _3, "org": _3 }], _46 = [0, { "j": _4 }], _47 = [0, { "dyn": _4 }], _48 = [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], _49 = [0, { "p": _4 }], _50 = [0, { "user": _4 }], _51 = [0, { "shop": _4 }], _52 = [0, { "cdn": _4 }], _53 = [0, { "cust": _4, "reservd": _4 }], _54 = [0, { "cust": _4 }], _55 = [0, { "s3": _4 }], _56 = [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3 }], _57 = [0, { "ipfs": _4 }], _58 = [1, { "framer": _4 }], _59 = [0, { "forgot": _4 }], _60 = [1, { "gs": _3 }], _61 = [0, { "nes": _3 }], _62 = [1, { "k12": _3, "cc": _3, "lib": _3 }], _63 = [1, { "cc": _3, "lib": _3 }];
      const rules2 = [0, { "ac": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "drr": _4, "feedback": _4, "forms": _4 }], "ad": _3, "ae": [1, { "ac": _3, "co": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "sch": _3 }], "aero": [1, { "airline": _3, "airport": _3, "accident-investigation": _3, "accident-prevention": _3, "aerobatic": _3, "aeroclub": _3, "aerodrome": _3, "agents": _3, "air-surveillance": _3, "air-traffic-control": _3, "aircraft": _3, "airtraffic": _3, "ambulance": _3, "association": _3, "author": _3, "ballooning": _3, "broker": _3, "caa": _3, "cargo": _3, "catering": _3, "certification": _3, "championship": _3, "charter": _3, "civilaviation": _3, "club": _3, "conference": _3, "consultant": _3, "consulting": _3, "control": _3, "council": _3, "crew": _3, "design": _3, "dgca": _3, "educator": _3, "emergency": _3, "engine": _3, "engineer": _3, "entertainment": _3, "equipment": _3, "exchange": _3, "express": _3, "federation": _3, "flight": _3, "freight": _3, "fuel": _3, "gliding": _3, "government": _3, "groundhandling": _3, "group": _3, "hanggliding": _3, "homebuilt": _3, "insurance": _3, "journal": _3, "journalist": _3, "leasing": _3, "logistics": _3, "magazine": _3, "maintenance": _3, "marketplace": _3, "media": _3, "microlight": _3, "modelling": _3, "navigation": _3, "parachuting": _3, "paragliding": _3, "passenger-association": _3, "pilot": _3, "press": _3, "production": _3, "recreation": _3, "repbody": _3, "res": _3, "research": _3, "rotorcraft": _3, "safety": _3, "scientist": _3, "services": _3, "show": _3, "skydiving": _3, "software": _3, "student": _3, "taxi": _3, "trader": _3, "trading": _3, "trainer": _3, "union": _3, "workinggroup": _3, "works": _3 }], "af": _5, "ag": [1, { "co": _3, "com": _3, "net": _3, "nom": _3, "org": _3, "obj": _4 }], "ai": [1, { "com": _3, "net": _3, "off": _3, "org": _3, "uwu": _4, "framer": _4 }], "al": _6, "am": [1, { "co": _3, "com": _3, "commune": _3, "net": _3, "org": _3, "radio": _4 }], "ao": [1, { "co": _3, "ed": _3, "edu": _3, "gov": _3, "gv": _3, "it": _3, "og": _3, "org": _3, "pb": _3 }], "aq": _3, "ar": [1, { "bet": _3, "com": _3, "coop": _3, "edu": _3, "gob": _3, "gov": _3, "int": _3, "mil": _3, "musica": _3, "mutual": _3, "net": _3, "org": _3, "seg": _3, "senasa": _3, "tur": _3 }], "arpa": [1, { "e164": _3, "home": _3, "in-addr": _3, "ip6": _3, "iris": _3, "uri": _3, "urn": _3 }], "as": _11, "asia": [1, { "cloudns": _4, "daemon": _4, "dix": _4 }], "at": [1, { "ac": [1, { "sth": _3 }], "co": _3, "gv": _3, "or": _3, "funkfeuer": [0, { "wien": _4 }], "futurecms": [0, { "*": _4, "ex": _7, "in": _7 }], "futurehosting": _4, "futuremailing": _4, "ortsinfo": [0, { "ex": _7, "kunden": _7 }], "biz": _4, "info": _4, "123webseite": _4, "priv": _4, "myspreadshop": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4 }], "au": [1, { "asn": _3, "com": [1, { "cloudlets": [0, { "mel": _4 }], "myspreadshop": _4 }], "edu": [1, { "act": _3, "catholic": _3, "nsw": [1, { "schools": _3 }], "nt": _3, "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "gov": [1, { "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "id": _3, "net": _3, "org": _3, "conf": _3, "oz": _3, "act": _3, "nsw": _3, "nt": _3, "qld": _3, "sa": _3, "tas": _3, "vic": _3, "wa": _3 }], "aw": [1, { "com": _3 }], "ax": _3, "az": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pp": _3, "pro": _3 }], "ba": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "rs": _4 }], "bb": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3, "store": _3, "tv": _3 }], "bd": _18, "be": [1, { "ac": _3, "cloudns": _4, "webhosting": _4, "interhostsolutions": [0, { "cloud": _4 }], "kuleuven": [0, { "ezproxy": _4 }], "123website": _4, "myspreadshop": _4, "transurl": _7 }], "bf": _11, "bg": [1, { "0": _3, "1": _3, "2": _3, "3": _3, "4": _3, "5": _3, "6": _3, "7": _3, "8": _3, "9": _3, "a": _3, "b": _3, "c": _3, "d": _3, "e": _3, "f": _3, "g": _3, "h": _3, "i": _3, "j": _3, "k": _3, "l": _3, "m": _3, "n": _3, "o": _3, "p": _3, "q": _3, "r": _3, "s": _3, "t": _3, "u": _3, "v": _3, "w": _3, "x": _3, "y": _3, "z": _3, "barsy": _4 }], "bh": _5, "bi": [1, { "co": _3, "com": _3, "edu": _3, "or": _3, "org": _3 }], "biz": [1, { "activetrail": _4, "cloud-ip": _4, "cloudns": _4, "jozi": _4, "dyndns": _4, "for-better": _4, "for-more": _4, "for-some": _4, "for-the": _4, "selfip": _4, "webhop": _4, "orx": _4, "mmafan": _4, "myftp": _4, "no-ip": _4, "dscloud": _4 }], "bj": [1, { "africa": _3, "agro": _3, "architectes": _3, "assur": _3, "avocats": _3, "co": _3, "com": _3, "eco": _3, "econo": _3, "edu": _3, "info": _3, "loisirs": _3, "money": _3, "net": _3, "org": _3, "ote": _3, "restaurant": _3, "resto": _3, "tourism": _3, "univ": _3 }], "bm": _5, "bn": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "co": _4 }], "bo": [1, { "com": _3, "edu": _3, "gob": _3, "int": _3, "mil": _3, "net": _3, "org": _3, "tv": _3, "web": _3, "academia": _3, "agro": _3, "arte": _3, "blog": _3, "bolivia": _3, "ciencia": _3, "cooperativa": _3, "democracia": _3, "deporte": _3, "ecologia": _3, "economia": _3, "empresa": _3, "indigena": _3, "industria": _3, "info": _3, "medicina": _3, "movimiento": _3, "musica": _3, "natural": _3, "nombre": _3, "noticias": _3, "patria": _3, "plurinacional": _3, "politica": _3, "profesional": _3, "pueblo": _3, "revista": _3, "salud": _3, "tecnologia": _3, "tksat": _3, "transporte": _3, "wiki": _3 }], "br": [1, { "9guacu": _3, "abc": _3, "adm": _3, "adv": _3, "agr": _3, "aju": _3, "am": _3, "anani": _3, "aparecida": _3, "app": _3, "arq": _3, "art": _3, "ato": _3, "b": _3, "barueri": _3, "belem": _3, "bet": _3, "bhz": _3, "bib": _3, "bio": _3, "blog": _3, "bmd": _3, "boavista": _3, "bsb": _3, "campinagrande": _3, "campinas": _3, "caxias": _3, "cim": _3, "cng": _3, "cnt": _3, "com": [1, { "simplesite": _4 }], "contagem": _3, "coop": _3, "coz": _3, "cri": _3, "cuiaba": _3, "curitiba": _3, "def": _3, "des": _3, "det": _3, "dev": _3, "ecn": _3, "eco": _3, "edu": _3, "emp": _3, "enf": _3, "eng": _3, "esp": _3, "etc": _3, "eti": _3, "far": _3, "feira": _3, "flog": _3, "floripa": _3, "fm": _3, "fnd": _3, "fortal": _3, "fot": _3, "foz": _3, "fst": _3, "g12": _3, "geo": _3, "ggf": _3, "goiania": _3, "gov": [1, { "ac": _3, "al": _3, "am": _3, "ap": _3, "ba": _3, "ce": _3, "df": _3, "es": _3, "go": _3, "ma": _3, "mg": _3, "ms": _3, "mt": _3, "pa": _3, "pb": _3, "pe": _3, "pi": _3, "pr": _3, "rj": _3, "rn": _3, "ro": _3, "rr": _3, "rs": _3, "sc": _3, "se": _3, "sp": _3, "to": _3 }], "gru": _3, "imb": _3, "ind": _3, "inf": _3, "jab": _3, "jampa": _3, "jdf": _3, "joinville": _3, "jor": _3, "jus": _3, "leg": [1, { "ac": _4, "al": _4, "am": _4, "ap": _4, "ba": _4, "ce": _4, "df": _4, "es": _4, "go": _4, "ma": _4, "mg": _4, "ms": _4, "mt": _4, "pa": _4, "pb": _4, "pe": _4, "pi": _4, "pr": _4, "rj": _4, "rn": _4, "ro": _4, "rr": _4, "rs": _4, "sc": _4, "se": _4, "sp": _4, "to": _4 }], "leilao": _3, "lel": _3, "log": _3, "londrina": _3, "macapa": _3, "maceio": _3, "manaus": _3, "maringa": _3, "mat": _3, "med": _3, "mil": _3, "morena": _3, "mp": _3, "mus": _3, "natal": _3, "net": _3, "niteroi": _3, "nom": _18, "not": _3, "ntr": _3, "odo": _3, "ong": _3, "org": _3, "osasco": _3, "palmas": _3, "poa": _3, "ppg": _3, "pro": _3, "psc": _3, "psi": _3, "pvh": _3, "qsl": _3, "radio": _3, "rec": _3, "recife": _3, "rep": _3, "ribeirao": _3, "rio": _3, "riobranco": _3, "riopreto": _3, "salvador": _3, "sampa": _3, "santamaria": _3, "santoandre": _3, "saobernardo": _3, "saogonca": _3, "seg": _3, "sjc": _3, "slg": _3, "slz": _3, "sorocaba": _3, "srv": _3, "taxi": _3, "tc": _3, "tec": _3, "teo": _3, "the": _3, "tmp": _3, "trd": _3, "tur": _3, "tv": _3, "udi": _3, "vet": _3, "vix": _3, "vlog": _3, "wiki": _3, "zlg": _3 }], "bs": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "we": _4 }], "bt": _5, "bv": _3, "bw": [1, { "ac": _3, "co": _3, "gov": _3, "net": _3, "org": _3 }], "by": [1, { "gov": _3, "mil": _3, "com": _3, "of": _3, "mediatech": _4 }], "bz": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "za": _4, "mydns": _4, "gsj": _4 }], "ca": [1, { "ab": _3, "bc": _3, "mb": _3, "nb": _3, "nf": _3, "nl": _3, "ns": _3, "nt": _3, "nu": _3, "on": _3, "pe": _3, "qc": _3, "sk": _3, "yk": _3, "gc": _3, "barsy": _4, "awdev": _7, "co": _4, "no-ip": _4, "myspreadshop": _4, "box": _4 }], "cat": _3, "cc": [1, { "cleverapps": _4, "cloudns": _4, "ftpaccess": _4, "game-server": _4, "myphotos": _4, "scrapping": _4, "twmail": _4, "csx": _4, "fantasyleague": _4, "spawn": [0, { "instances": _4 }] }], "cd": _11, "cf": _3, "cg": _3, "ch": [1, { "square7": _4, "cloudns": _4, "cloudscale": [0, { "cust": _4, "lpg": _20, "rma": _20 }], "flow": [0, { "ae": [0, { "alp1": _4 }], "appengine": _4 }], "linkyard-cloud": _4, "gotdns": _4, "dnsking": _4, "123website": _4, "myspreadshop": _4, "firenet": [0, { "*": _4, "svc": _7 }], "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4 }], "ci": [1, { "ac": _3, "xn--aroport-bya": _3, "a\xE9roport": _3, "asso": _3, "co": _3, "com": _3, "ed": _3, "edu": _3, "go": _3, "gouv": _3, "int": _3, "net": _3, "or": _3, "org": _3 }], "ck": _18, "cl": [1, { "co": _3, "gob": _3, "gov": _3, "mil": _3, "cloudns": _4 }], "cm": [1, { "co": _3, "com": _3, "gov": _3, "net": _3 }], "cn": [1, { "ac": _3, "com": [1, { "amazonaws": [0, { "cn-north-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4 }], "cn-northwest-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _24, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4 }], "compute": _7, "airflow": [0, { "cn-north-1": _7, "cn-northwest-1": _7 }], "eb": [0, { "cn-north-1": _4, "cn-northwest-1": _4 }], "elb": _7 }], "sagemaker": [0, { "cn-north-1": _13, "cn-northwest-1": _13 }] }], "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--od0alg": _3, "\u7DB2\u7D61": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "ah": _3, "bj": _3, "cq": _3, "fj": _3, "gd": _3, "gs": _3, "gx": _3, "gz": _3, "ha": _3, "hb": _3, "he": _3, "hi": _3, "hk": _3, "hl": _3, "hn": _3, "jl": _3, "js": _3, "jx": _3, "ln": _3, "mo": _3, "nm": _3, "nx": _3, "qh": _3, "sc": _3, "sd": _3, "sh": [1, { "as": _4 }], "sn": _3, "sx": _3, "tj": _3, "tw": _3, "xj": _3, "xz": _3, "yn": _3, "zj": _3, "canva-apps": _4, "canvasite": _22, "myqnapcloud": _4, "quickconnect": _25 }], "co": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "carrd": _4, "crd": _4, "otap": _7, "leadpages": _4, "lpages": _4, "mypi": _4, "xmit": _7, "firewalledreplit": _10, "repl": _10, "supabase": _4 }], "com": [1, { "a2hosted": _4, "cpserver": _4, "adobeaemcloud": [2, { "dev": _7 }], "africa": _4, "airkitapps": _4, "airkitapps-au": _4, "aivencloud": _4, "alibabacloudcs": _4, "kasserver": _4, "amazonaws": [0, { "af-south-1": _28, "ap-east-1": _29, "ap-northeast-1": _30, "ap-northeast-2": _30, "ap-northeast-3": _28, "ap-south-1": _30, "ap-south-2": _31, "ap-southeast-1": _30, "ap-southeast-2": _30, "ap-southeast-3": _31, "ap-southeast-4": _31, "ap-southeast-5": [0, { "execute-api": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4 }], "ca-central-1": _33, "ca-west-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4 }], "eu-central-1": _30, "eu-central-2": _31, "eu-north-1": _29, "eu-south-1": _28, "eu-south-2": _31, "eu-west-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-deprecated": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], "eu-west-2": _29, "eu-west-3": _28, "il-central-1": [0, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _23, "s3": _4, "s3-accesspoint": _4, "s3-object-lambda": _4, "s3-website": _4, "aws-cloud9": _26, "cloud9": [0, { "vfs": _4 }] }], "me-central-1": _31, "me-south-1": _29, "sa-east-1": _28, "us-east-1": [2, { "execute-api": _4, "emrappui-prod": _4, "emrnotebooks-prod": _4, "emrstudio-prod": _4, "dualstack": _32, "s3": _4, "s3-accesspoint": _4, "s3-accesspoint-fips": _4, "s3-deprecated": _4, "s3-fips": _4, "s3-object-lambda": _4, "s3-website": _4, "analytics-gateway": _4, "aws-cloud9": _26, "cloud9": _27 }], "us-east-2": _34, "us-gov-east-1": _36, "us-gov-west-1": _36, "us-west-1": _33, "us-west-2": _34, "compute": _7, "compute-1": _7, "airflow": [0, { "af-south-1": _7, "ap-east-1": _7, "ap-northeast-1": _7, "ap-northeast-2": _7, "ap-northeast-3": _7, "ap-south-1": _7, "ap-south-2": _7, "ap-southeast-1": _7, "ap-southeast-2": _7, "ap-southeast-3": _7, "ap-southeast-4": _7, "ca-central-1": _7, "ca-west-1": _7, "eu-central-1": _7, "eu-central-2": _7, "eu-north-1": _7, "eu-south-1": _7, "eu-south-2": _7, "eu-west-1": _7, "eu-west-2": _7, "eu-west-3": _7, "il-central-1": _7, "me-central-1": _7, "me-south-1": _7, "sa-east-1": _7, "us-east-1": _7, "us-east-2": _7, "us-west-1": _7, "us-west-2": _7 }], "s3": _4, "s3-1": _4, "s3-ap-east-1": _4, "s3-ap-northeast-1": _4, "s3-ap-northeast-2": _4, "s3-ap-northeast-3": _4, "s3-ap-south-1": _4, "s3-ap-southeast-1": _4, "s3-ap-southeast-2": _4, "s3-ca-central-1": _4, "s3-eu-central-1": _4, "s3-eu-north-1": _4, "s3-eu-west-1": _4, "s3-eu-west-2": _4, "s3-eu-west-3": _4, "s3-external-1": _4, "s3-fips-us-gov-east-1": _4, "s3-fips-us-gov-west-1": _4, "s3-global": [0, { "accesspoint": [0, { "mrap": _4 }] }], "s3-me-south-1": _4, "s3-sa-east-1": _4, "s3-us-east-2": _4, "s3-us-gov-east-1": _4, "s3-us-gov-west-1": _4, "s3-us-west-1": _4, "s3-us-west-2": _4, "s3-website-ap-northeast-1": _4, "s3-website-ap-southeast-1": _4, "s3-website-ap-southeast-2": _4, "s3-website-eu-west-1": _4, "s3-website-sa-east-1": _4, "s3-website-us-east-1": _4, "s3-website-us-gov-west-1": _4, "s3-website-us-west-1": _4, "s3-website-us-west-2": _4, "elb": _7 }], "amazoncognito": [0, { "af-south-1": _37, "ap-east-1": _37, "ap-northeast-1": _37, "ap-northeast-2": _37, "ap-northeast-3": _37, "ap-south-1": _37, "ap-south-2": _37, "ap-southeast-1": _37, "ap-southeast-2": _37, "ap-southeast-3": _37, "ap-southeast-4": _37, "ap-southeast-5": _37, "ca-central-1": _37, "ca-west-1": _37, "eu-central-1": _37, "eu-central-2": _37, "eu-north-1": _37, "eu-south-1": _37, "eu-south-2": _37, "eu-west-1": _37, "eu-west-2": _37, "eu-west-3": _37, "il-central-1": _37, "me-central-1": _37, "me-south-1": _37, "sa-east-1": _37, "us-east-1": _38, "us-east-2": _38, "us-gov-east-1": _39, "us-gov-west-1": _39, "us-west-1": _38, "us-west-2": _38 }], "amplifyapp": _4, "awsapprunner": _7, "awsapps": _4, "elasticbeanstalk": [2, { "af-south-1": _4, "ap-east-1": _4, "ap-northeast-1": _4, "ap-northeast-2": _4, "ap-northeast-3": _4, "ap-south-1": _4, "ap-southeast-1": _4, "ap-southeast-2": _4, "ap-southeast-3": _4, "ca-central-1": _4, "eu-central-1": _4, "eu-north-1": _4, "eu-south-1": _4, "eu-west-1": _4, "eu-west-2": _4, "eu-west-3": _4, "il-central-1": _4, "me-south-1": _4, "sa-east-1": _4, "us-east-1": _4, "us-east-2": _4, "us-gov-east-1": _4, "us-gov-west-1": _4, "us-west-1": _4, "us-west-2": _4 }], "awsglobalaccelerator": _4, "siiites": _4, "appspacehosted": _4, "appspaceusercontent": _4, "on-aptible": _4, "myasustor": _4, "balena-devices": _4, "boutir": _4, "bplaced": _4, "cafjs": _4, "canva-apps": _4, "cdn77-storage": _4, "br": _4, "cn": _4, "de": _4, "eu": _4, "jpn": _4, "mex": _4, "ru": _4, "sa": _4, "uk": _4, "us": _4, "za": _4, "clever-cloud": [0, { "services": _7 }], "dnsabr": _4, "ip-ddns": _4, "jdevcloud": _4, "wpdevcloud": _4, "cf-ipfs": _4, "cloudflare-ipfs": _4, "trycloudflare": _4, "co": _4, "devinapps": _7, "builtwithdark": _4, "datadetect": [0, { "demo": _4, "instance": _4 }], "dattolocal": _4, "dattorelay": _4, "dattoweb": _4, "mydatto": _4, "digitaloceanspaces": _7, "discordsays": _4, "discordsez": _4, "drayddns": _4, "dreamhosters": _4, "durumis": _4, "mydrobo": _4, "blogdns": _4, "cechire": _4, "dnsalias": _4, "dnsdojo": _4, "doesntexist": _4, "dontexist": _4, "doomdns": _4, "dyn-o-saur": _4, "dynalias": _4, "dyndns-at-home": _4, "dyndns-at-work": _4, "dyndns-blog": _4, "dyndns-free": _4, "dyndns-home": _4, "dyndns-ip": _4, "dyndns-mail": _4, "dyndns-office": _4, "dyndns-pics": _4, "dyndns-remote": _4, "dyndns-server": _4, "dyndns-web": _4, "dyndns-wiki": _4, "dyndns-work": _4, "est-a-la-maison": _4, "est-a-la-masion": _4, "est-le-patron": _4, "est-mon-blogueur": _4, "from-ak": _4, "from-al": _4, "from-ar": _4, "from-ca": _4, "from-ct": _4, "from-dc": _4, "from-de": _4, "from-fl": _4, "from-ga": _4, "from-hi": _4, "from-ia": _4, "from-id": _4, "from-il": _4, "from-in": _4, "from-ks": _4, "from-ky": _4, "from-ma": _4, "from-md": _4, "from-mi": _4, "from-mn": _4, "from-mo": _4, "from-ms": _4, "from-mt": _4, "from-nc": _4, "from-nd": _4, "from-ne": _4, "from-nh": _4, "from-nj": _4, "from-nm": _4, "from-nv": _4, "from-oh": _4, "from-ok": _4, "from-or": _4, "from-pa": _4, "from-pr": _4, "from-ri": _4, "from-sc": _4, "from-sd": _4, "from-tn": _4, "from-tx": _4, "from-ut": _4, "from-va": _4, "from-vt": _4, "from-wa": _4, "from-wi": _4, "from-wv": _4, "from-wy": _4, "getmyip": _4, "gotdns": _4, "hobby-site": _4, "homelinux": _4, "homeunix": _4, "iamallama": _4, "is-a-anarchist": _4, "is-a-blogger": _4, "is-a-bookkeeper": _4, "is-a-bulls-fan": _4, "is-a-caterer": _4, "is-a-chef": _4, "is-a-conservative": _4, "is-a-cpa": _4, "is-a-cubicle-slave": _4, "is-a-democrat": _4, "is-a-designer": _4, "is-a-doctor": _4, "is-a-financialadvisor": _4, "is-a-geek": _4, "is-a-green": _4, "is-a-guru": _4, "is-a-hard-worker": _4, "is-a-hunter": _4, "is-a-landscaper": _4, "is-a-lawyer": _4, "is-a-liberal": _4, "is-a-libertarian": _4, "is-a-llama": _4, "is-a-musician": _4, "is-a-nascarfan": _4, "is-a-nurse": _4, "is-a-painter": _4, "is-a-personaltrainer": _4, "is-a-photographer": _4, "is-a-player": _4, "is-a-republican": _4, "is-a-rockstar": _4, "is-a-socialist": _4, "is-a-student": _4, "is-a-teacher": _4, "is-a-techie": _4, "is-a-therapist": _4, "is-an-accountant": _4, "is-an-actor": _4, "is-an-actress": _4, "is-an-anarchist": _4, "is-an-artist": _4, "is-an-engineer": _4, "is-an-entertainer": _4, "is-certified": _4, "is-gone": _4, "is-into-anime": _4, "is-into-cars": _4, "is-into-cartoons": _4, "is-into-games": _4, "is-leet": _4, "is-not-certified": _4, "is-slick": _4, "is-uberleet": _4, "is-with-theband": _4, "isa-geek": _4, "isa-hockeynut": _4, "issmarterthanyou": _4, "likes-pie": _4, "likescandy": _4, "neat-url": _4, "saves-the-whales": _4, "selfip": _4, "sells-for-less": _4, "sells-for-u": _4, "servebbs": _4, "simple-url": _4, "space-to-rent": _4, "teaches-yoga": _4, "writesthisblog": _4, "ddnsfree": _4, "ddnsgeek": _4, "giize": _4, "gleeze": _4, "kozow": _4, "loseyourip": _4, "ooguy": _4, "theworkpc": _4, "mytuleap": _4, "tuleap-partners": _4, "encoreapi": _4, "evennode": [0, { "eu-1": _4, "eu-2": _4, "eu-3": _4, "eu-4": _4, "us-1": _4, "us-2": _4, "us-3": _4, "us-4": _4 }], "onfabrica": _4, "fastly-edge": _4, "fastly-terrarium": _4, "fastvps-server": _4, "mydobiss": _4, "firebaseapp": _4, "fldrv": _4, "forgeblocks": _4, "framercanvas": _4, "freebox-os": _4, "freeboxos": _4, "freemyip": _4, "aliases121": _4, "gentapps": _4, "gentlentapis": _4, "githubusercontent": _4, "0emm": _7, "appspot": [2, { "r": _7 }], "blogspot": _4, "codespot": _4, "googleapis": _4, "googlecode": _4, "pagespeedmobilizer": _4, "withgoogle": _4, "withyoutube": _4, "grayjayleagues": _4, "hatenablog": _4, "hatenadiary": _4, "herokuapp": _4, "gr": _4, "smushcdn": _4, "wphostedmail": _4, "wpmucdn": _4, "pixolino": _4, "apps-1and1": _4, "live-website": _4, "dopaas": _4, "hosted-by-previder": _41, "hosteur": [0, { "rag-cloud": _4, "rag-cloud-ch": _4 }], "ik-server": [0, { "jcloud": _4, "jcloud-ver-jpc": _4 }], "jelastic": [0, { "demo": _4 }], "massivegrid": _41, "wafaicloud": [0, { "jed": _4, "ryd": _4 }], "webadorsite": _4, "joyent": [0, { "cns": _7 }], "lpusercontent": _4, "linode": [0, { "members": _4, "nodebalancer": _7 }], "linodeobjects": _7, "linodeusercontent": [0, { "ip": _4 }], "localtonet": _4, "lovableproject": _4, "barsycenter": _4, "barsyonline": _4, "modelscape": _4, "mwcloudnonprod": _4, "polyspace": _4, "mazeplay": _4, "miniserver": _4, "atmeta": _4, "fbsbx": _40, "meteorapp": _42, "routingthecloud": _4, "mydbserver": _4, "hostedpi": _4, "mythic-beasts": [0, { "caracal": _4, "customer": _4, "fentiger": _4, "lynx": _4, "ocelot": _4, "oncilla": _4, "onza": _4, "sphinx": _4, "vs": _4, "x": _4, "yali": _4 }], "nospamproxy": [0, { "cloud": [2, { "o365": _4 }] }], "4u": _4, "nfshost": _4, "3utilities": _4, "blogsyte": _4, "ciscofreak": _4, "damnserver": _4, "ddnsking": _4, "ditchyourip": _4, "dnsiskinky": _4, "dynns": _4, "geekgalaxy": _4, "health-carereform": _4, "homesecuritymac": _4, "homesecuritypc": _4, "myactivedirectory": _4, "mysecuritycamera": _4, "myvnc": _4, "net-freaks": _4, "onthewifi": _4, "point2this": _4, "quicksytes": _4, "securitytactics": _4, "servebeer": _4, "servecounterstrike": _4, "serveexchange": _4, "serveftp": _4, "servegame": _4, "servehalflife": _4, "servehttp": _4, "servehumour": _4, "serveirc": _4, "servemp3": _4, "servep2p": _4, "servepics": _4, "servequake": _4, "servesarcasm": _4, "stufftoread": _4, "unusualperson": _4, "workisboring": _4, "myiphost": _4, "observableusercontent": [0, { "static": _4 }], "simplesite": _4, "orsites": _4, "operaunite": _4, "customer-oci": [0, { "*": _4, "oci": _7, "ocp": _7, "ocs": _7 }], "oraclecloudapps": _7, "oraclegovcloudapps": _7, "authgear-staging": _4, "authgearapps": _4, "skygearapp": _4, "outsystemscloud": _4, "ownprovider": _4, "pgfog": _4, "pagexl": _4, "gotpantheon": _4, "paywhirl": _7, "upsunapp": _4, "postman-echo": _4, "prgmr": [0, { "xen": _4 }], "pythonanywhere": _42, "qa2": _4, "alpha-myqnapcloud": _4, "dev-myqnapcloud": _4, "mycloudnas": _4, "mynascloud": _4, "myqnapcloud": _4, "qualifioapp": _4, "ladesk": _4, "qbuser": _4, "quipelements": _7, "rackmaze": _4, "readthedocs-hosted": _4, "rhcloud": _4, "onrender": _4, "render": _43, "subsc-pay": _4, "180r": _4, "dojin": _4, "sakuratan": _4, "sakuraweb": _4, "x0": _4, "code": [0, { "builder": _7, "dev-builder": _7, "stg-builder": _7 }], "salesforce": [0, { "platform": [0, { "code-builder-stg": [0, { "test": [0, { "001": _7 }] }] }] }], "logoip": _4, "scrysec": _4, "firewall-gateway": _4, "myshopblocks": _4, "myshopify": _4, "shopitsite": _4, "1kapp": _4, "appchizi": _4, "applinzi": _4, "sinaapp": _4, "vipsinaapp": _4, "streamlitapp": _4, "try-snowplow": _4, "playstation-cloud": _4, "myspreadshop": _4, "w-corp-staticblitz": _4, "w-credentialless-staticblitz": _4, "w-staticblitz": _4, "stackhero-network": _4, "stdlib": [0, { "api": _4 }], "strapiapp": [2, { "media": _4 }], "streak-link": _4, "streaklinks": _4, "streakusercontent": _4, "temp-dns": _4, "dsmynas": _4, "familyds": _4, "mytabit": _4, "taveusercontent": _4, "tb-hosting": _44, "reservd": _4, "thingdustdata": _4, "townnews-staging": _4, "typeform": [0, { "pro": _4 }], "hk": _4, "it": _4, "deus-canvas": _4, "vultrobjects": _7, "wafflecell": _4, "hotelwithflight": _4, "reserve-online": _4, "cprapid": _4, "pleskns": _4, "remotewd": _4, "wiardweb": [0, { "pages": _4 }], "wixsite": _4, "wixstudio": _4, "messwithdns": _4, "woltlab-demo": _4, "wpenginepowered": [2, { "js": _4 }], "xnbay": [2, { "u2": _4, "u2-local": _4 }], "yolasite": _4 }], "coop": _3, "cr": [1, { "ac": _3, "co": _3, "ed": _3, "fi": _3, "go": _3, "or": _3, "sa": _3 }], "cu": [1, { "com": _3, "edu": _3, "gob": _3, "inf": _3, "nat": _3, "net": _3, "org": _3 }], "cv": [1, { "com": _3, "edu": _3, "id": _3, "int": _3, "net": _3, "nome": _3, "org": _3, "publ": _3 }], "cw": _45, "cx": [1, { "gov": _3, "cloudns": _4, "ath": _4, "info": _4, "assessments": _4, "calculators": _4, "funnels": _4, "paynow": _4, "quizzes": _4, "researched": _4, "tests": _4 }], "cy": [1, { "ac": _3, "biz": _3, "com": [1, { "scaleforce": _46 }], "ekloges": _3, "gov": _3, "ltd": _3, "mil": _3, "net": _3, "org": _3, "press": _3, "pro": _3, "tm": _3 }], "cz": [1, { "contentproxy9": [0, { "rsc": _4 }], "realm": _4, "e4": _4, "co": _4, "metacentrum": [0, { "cloud": _7, "custom": _4 }], "muni": [0, { "cloud": [0, { "flt": _4, "usr": _4 }] }] }], "de": [1, { "bplaced": _4, "square7": _4, "com": _4, "cosidns": _47, "dnsupdater": _4, "dynamisches-dns": _4, "internet-dns": _4, "l-o-g-i-n": _4, "ddnss": [2, { "dyn": _4, "dyndns": _4 }], "dyn-ip24": _4, "dyndns1": _4, "home-webserver": [2, { "dyn": _4 }], "myhome-server": _4, "dnshome": _4, "fuettertdasnetz": _4, "isteingeek": _4, "istmein": _4, "lebtimnetz": _4, "leitungsen": _4, "traeumtgerade": _4, "frusky": _7, "goip": _4, "xn--gnstigbestellen-zvb": _4, "g\xFCnstigbestellen": _4, "xn--gnstigliefern-wob": _4, "g\xFCnstigliefern": _4, "hs-heilbronn": [0, { "it": [0, { "pages": _4, "pages-research": _4 }] }], "dyn-berlin": _4, "in-berlin": _4, "in-brb": _4, "in-butter": _4, "in-dsl": _4, "in-vpn": _4, "iservschule": _4, "mein-iserv": _4, "schulplattform": _4, "schulserver": _4, "test-iserv": _4, "keymachine": _4, "git-repos": _4, "lcube-server": _4, "svn-repos": _4, "barsy": _4, "webspaceconfig": _4, "123webseite": _4, "rub": _4, "ruhr-uni-bochum": [2, { "noc": [0, { "io": _4 }] }], "logoip": _4, "firewall-gateway": _4, "my-gateway": _4, "my-router": _4, "spdns": _4, "speedpartner": [0, { "customer": _4 }], "myspreadshop": _4, "taifun-dns": _4, "12hp": _4, "2ix": _4, "4lima": _4, "lima-city": _4, "dd-dns": _4, "dray-dns": _4, "draydns": _4, "dyn-vpn": _4, "dynvpn": _4, "mein-vigor": _4, "my-vigor": _4, "my-wan": _4, "syno-ds": _4, "synology-diskstation": _4, "synology-ds": _4, "uberspace": _7, "virtual-user": _4, "virtualuser": _4, "community-pro": _4, "diskussionsbereich": _4 }], "dj": _3, "dk": [1, { "biz": _4, "co": _4, "firm": _4, "reg": _4, "store": _4, "123hjemmeside": _4, "myspreadshop": _4 }], "dm": _48, "do": [1, { "art": _3, "com": _3, "edu": _3, "gob": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "sld": _3, "web": _3 }], "dz": [1, { "art": _3, "asso": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "pol": _3, "soc": _3, "tm": _3 }], "ec": [1, { "com": _3, "edu": _3, "fin": _3, "gob": _3, "gov": _3, "info": _3, "k12": _3, "med": _3, "mil": _3, "net": _3, "org": _3, "pro": _3, "base": _4, "official": _4 }], "edu": [1, { "rit": [0, { "git-pages": _4 }] }], "ee": [1, { "aip": _3, "com": _3, "edu": _3, "fie": _3, "gov": _3, "lib": _3, "med": _3, "org": _3, "pri": _3, "riik": _3 }], "eg": [1, { "ac": _3, "com": _3, "edu": _3, "eun": _3, "gov": _3, "info": _3, "me": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "sci": _3, "sport": _3, "tv": _3 }], "er": _18, "es": [1, { "com": _3, "edu": _3, "gob": _3, "nom": _3, "org": _3, "123miweb": _4, "myspreadshop": _4 }], "et": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "name": _3, "net": _3, "org": _3 }], "eu": [1, { "airkitapps": _4, "cloudns": _4, "dogado": [0, { "jelastic": _4 }], "barsy": _4, "spdns": _4, "transurl": _7, "diskstation": _4 }], "fi": [1, { "aland": _3, "dy": _4, "xn--hkkinen-5wa": _4, "h\xE4kkinen": _4, "iki": _4, "cloudplatform": [0, { "fi": _4 }], "datacenter": [0, { "demo": _4, "paas": _4 }], "kapsi": _4, "123kotisivu": _4, "myspreadshop": _4 }], "fj": [1, { "ac": _3, "biz": _3, "com": _3, "gov": _3, "info": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "fk": _18, "fm": [1, { "com": _3, "edu": _3, "net": _3, "org": _3, "radio": _4, "user": _7 }], "fo": _3, "fr": [1, { "asso": _3, "com": _3, "gouv": _3, "nom": _3, "prd": _3, "tm": _3, "avoues": _3, "cci": _3, "greta": _3, "huissier-justice": _3, "en-root": _4, "fbx-os": _4, "fbxos": _4, "freebox-os": _4, "freeboxos": _4, "goupile": _4, "123siteweb": _4, "on-web": _4, "chirurgiens-dentistes-en-france": _4, "dedibox": _4, "aeroport": _4, "avocat": _4, "chambagri": _4, "chirurgiens-dentistes": _4, "experts-comptables": _4, "medecin": _4, "notaires": _4, "pharmacien": _4, "port": _4, "veterinaire": _4, "myspreadshop": _4, "ynh": _4 }], "ga": _3, "gb": _3, "gd": [1, { "edu": _3, "gov": _3 }], "ge": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "pvt": _3, "school": _3 }], "gf": _3, "gg": [1, { "co": _3, "net": _3, "org": _3, "botdash": _4, "kaas": _4, "stackit": _4, "panel": [2, { "daemon": _4 }] }], "gh": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "org": _3 }], "gi": [1, { "com": _3, "edu": _3, "gov": _3, "ltd": _3, "mod": _3, "org": _3 }], "gl": [1, { "co": _3, "com": _3, "edu": _3, "net": _3, "org": _3, "biz": _4 }], "gm": _3, "gn": [1, { "ac": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], "gov": _3, "gp": [1, { "asso": _3, "com": _3, "edu": _3, "mobi": _3, "net": _3, "org": _3 }], "gq": _3, "gr": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "barsy": _4, "simplesite": _4 }], "gs": _3, "gt": [1, { "com": _3, "edu": _3, "gob": _3, "ind": _3, "mil": _3, "net": _3, "org": _3 }], "gu": [1, { "com": _3, "edu": _3, "gov": _3, "guam": _3, "info": _3, "net": _3, "org": _3, "web": _3 }], "gw": _3, "gy": _48, "hk": [1, { "com": _3, "edu": _3, "gov": _3, "idv": _3, "net": _3, "org": _3, "xn--ciqpn": _3, "\u4E2A\u4EBA": _3, "xn--gmqw5a": _3, "\u500B\u4EBA": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--mxtq1m": _3, "\u653F\u5E9C": _3, "xn--lcvr32d": _3, "\u654E\u80B2": _3, "xn--wcvs22d": _3, "\u6559\u80B2": _3, "xn--gmq050i": _3, "\u7B87\u4EBA": _3, "xn--uc0atv": _3, "\u7D44\u7E54": _3, "xn--uc0ay4a": _3, "\u7D44\u7EC7": _3, "xn--od0alg": _3, "\u7DB2\u7D61": _3, "xn--zf0avx": _3, "\u7DB2\u7EDC": _3, "xn--mk0axi": _3, "\u7EC4\u7E54": _3, "xn--tn0ag": _3, "\u7EC4\u7EC7": _3, "xn--od0aq3b": _3, "\u7F51\u7D61": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "inc": _4, "ltd": _4 }], "hm": _3, "hn": [1, { "com": _3, "edu": _3, "gob": _3, "mil": _3, "net": _3, "org": _3 }], "hr": [1, { "com": _3, "from": _3, "iz": _3, "name": _3, "brendly": _51 }], "ht": [1, { "adult": _3, "art": _3, "asso": _3, "com": _3, "coop": _3, "edu": _3, "firm": _3, "gouv": _3, "info": _3, "med": _3, "net": _3, "org": _3, "perso": _3, "pol": _3, "pro": _3, "rel": _3, "shop": _3, "rt": _4 }], "hu": [1, { "2000": _3, "agrar": _3, "bolt": _3, "casino": _3, "city": _3, "co": _3, "erotica": _3, "erotika": _3, "film": _3, "forum": _3, "games": _3, "hotel": _3, "info": _3, "ingatlan": _3, "jogasz": _3, "konyvelo": _3, "lakas": _3, "media": _3, "news": _3, "org": _3, "priv": _3, "reklam": _3, "sex": _3, "shop": _3, "sport": _3, "suli": _3, "szex": _3, "tm": _3, "tozsde": _3, "utazas": _3, "video": _3 }], "id": [1, { "ac": _3, "biz": _3, "co": _3, "desa": _3, "go": _3, "mil": _3, "my": _3, "net": _3, "or": _3, "ponpes": _3, "sch": _3, "web": _3, "zone": _4 }], "ie": [1, { "gov": _3, "myspreadshop": _4 }], "il": [1, { "ac": _3, "co": [1, { "ravpage": _4, "mytabit": _4, "tabitorder": _4 }], "gov": _3, "idf": _3, "k12": _3, "muni": _3, "net": _3, "org": _3 }], "xn--4dbrk0ce": [1, { "xn--4dbgdty6c": _3, "xn--5dbhl8d": _3, "xn--8dbq2a": _3, "xn--hebda8b": _3 }], "\u05D9\u05E9\u05E8\u05D0\u05DC": [1, { "\u05D0\u05E7\u05D3\u05DE\u05D9\u05D4": _3, "\u05D9\u05E9\u05D5\u05D1": _3, "\u05E6\u05D4\u05DC": _3, "\u05DE\u05DE\u05E9\u05DC": _3 }], "im": [1, { "ac": _3, "co": [1, { "ltd": _3, "plc": _3 }], "com": _3, "net": _3, "org": _3, "tt": _3, "tv": _3 }], "in": [1, { "5g": _3, "6g": _3, "ac": _3, "ai": _3, "am": _3, "bihar": _3, "biz": _3, "business": _3, "ca": _3, "cn": _3, "co": _3, "com": _3, "coop": _3, "cs": _3, "delhi": _3, "dr": _3, "edu": _3, "er": _3, "firm": _3, "gen": _3, "gov": _3, "gujarat": _3, "ind": _3, "info": _3, "int": _3, "internet": _3, "io": _3, "me": _3, "mil": _3, "net": _3, "nic": _3, "org": _3, "pg": _3, "post": _3, "pro": _3, "res": _3, "travel": _3, "tv": _3, "uk": _3, "up": _3, "us": _3, "cloudns": _4, "barsy": _4, "web": _4, "supabase": _4 }], "info": [1, { "cloudns": _4, "dynamic-dns": _4, "barrel-of-knowledge": _4, "barrell-of-knowledge": _4, "dyndns": _4, "for-our": _4, "groks-the": _4, "groks-this": _4, "here-for-more": _4, "knowsitall": _4, "selfip": _4, "webhop": _4, "barsy": _4, "mayfirst": _4, "mittwald": _4, "mittwaldserver": _4, "typo3server": _4, "dvrcam": _4, "ilovecollege": _4, "no-ip": _4, "forumz": _4, "nsupdate": _4, "dnsupdate": _4, "v-info": _4 }], "int": [1, { "eu": _3 }], "io": [1, { "2038": _4, "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "on-acorn": _7, "myaddr": _4, "apigee": _4, "b-data": _4, "beagleboard": _4, "bitbucket": _4, "bluebite": _4, "boxfuse": _4, "brave": _8, "browsersafetymark": _4, "bubble": _52, "bubbleapps": _4, "bigv": [0, { "uk0": _4 }], "cleverapps": _4, "cloudbeesusercontent": _4, "dappnode": [0, { "dyndns": _4 }], "darklang": _4, "definima": _4, "dedyn": _4, "fh-muenster": _4, "shw": _4, "forgerock": [0, { "id": _4 }], "github": _4, "gitlab": _4, "lolipop": _4, "hasura-app": _4, "hostyhosting": _4, "hypernode": _4, "moonscale": _7, "beebyte": _41, "beebyteapp": [0, { "sekd1": _4 }], "jele": _4, "webthings": _4, "loginline": _4, "barsy": _4, "azurecontainer": _7, "ngrok": [2, { "ap": _4, "au": _4, "eu": _4, "in": _4, "jp": _4, "sa": _4, "us": _4 }], "nodeart": [0, { "stage": _4 }], "pantheonsite": _4, "pstmn": [2, { "mock": _4 }], "protonet": _4, "qcx": [2, { "sys": _7 }], "qoto": _4, "vaporcloud": _4, "myrdbx": _4, "rb-hosting": _44, "on-k3s": _7, "on-rio": _7, "readthedocs": _4, "resindevice": _4, "resinstaging": [0, { "devices": _4 }], "hzc": _4, "sandcats": _4, "scrypted": [0, { "client": _4 }], "mo-siemens": _4, "lair": _40, "stolos": _7, "musician": _4, "utwente": _4, "edugit": _4, "telebit": _4, "thingdust": [0, { "dev": _53, "disrec": _53, "prod": _54, "testing": _53 }], "tickets": _4, "webflow": _4, "webflowtest": _4, "editorx": _4, "wixstudio": _4, "basicserver": _4, "virtualserver": _4 }], "iq": _6, "ir": [1, { "ac": _3, "co": _3, "gov": _3, "id": _3, "net": _3, "org": _3, "sch": _3, "xn--mgba3a4f16a": _3, "\u0627\u06CC\u0631\u0627\u0646": _3, "xn--mgba3a4fra": _3, "\u0627\u064A\u0631\u0627\u0646": _3, "arvanedge": _4 }], "is": _3, "it": [1, { "edu": _3, "gov": _3, "abr": _3, "abruzzo": _3, "aosta-valley": _3, "aostavalley": _3, "bas": _3, "basilicata": _3, "cal": _3, "calabria": _3, "cam": _3, "campania": _3, "emilia-romagna": _3, "emiliaromagna": _3, "emr": _3, "friuli-v-giulia": _3, "friuli-ve-giulia": _3, "friuli-vegiulia": _3, "friuli-venezia-giulia": _3, "friuli-veneziagiulia": _3, "friuli-vgiulia": _3, "friuliv-giulia": _3, "friulive-giulia": _3, "friulivegiulia": _3, "friulivenezia-giulia": _3, "friuliveneziagiulia": _3, "friulivgiulia": _3, "fvg": _3, "laz": _3, "lazio": _3, "lig": _3, "liguria": _3, "lom": _3, "lombardia": _3, "lombardy": _3, "lucania": _3, "mar": _3, "marche": _3, "mol": _3, "molise": _3, "piedmont": _3, "piemonte": _3, "pmn": _3, "pug": _3, "puglia": _3, "sar": _3, "sardegna": _3, "sardinia": _3, "sic": _3, "sicilia": _3, "sicily": _3, "taa": _3, "tos": _3, "toscana": _3, "trentin-sud-tirol": _3, "xn--trentin-sd-tirol-rzb": _3, "trentin-s\xFCd-tirol": _3, "trentin-sudtirol": _3, "xn--trentin-sdtirol-7vb": _3, "trentin-s\xFCdtirol": _3, "trentin-sued-tirol": _3, "trentin-suedtirol": _3, "trentino": _3, "trentino-a-adige": _3, "trentino-aadige": _3, "trentino-alto-adige": _3, "trentino-altoadige": _3, "trentino-s-tirol": _3, "trentino-stirol": _3, "trentino-sud-tirol": _3, "xn--trentino-sd-tirol-c3b": _3, "trentino-s\xFCd-tirol": _3, "trentino-sudtirol": _3, "xn--trentino-sdtirol-szb": _3, "trentino-s\xFCdtirol": _3, "trentino-sued-tirol": _3, "trentino-suedtirol": _3, "trentinoa-adige": _3, "trentinoaadige": _3, "trentinoalto-adige": _3, "trentinoaltoadige": _3, "trentinos-tirol": _3, "trentinostirol": _3, "trentinosud-tirol": _3, "xn--trentinosd-tirol-rzb": _3, "trentinos\xFCd-tirol": _3, "trentinosudtirol": _3, "xn--trentinosdtirol-7vb": _3, "trentinos\xFCdtirol": _3, "trentinosued-tirol": _3, "trentinosuedtirol": _3, "trentinsud-tirol": _3, "xn--trentinsd-tirol-6vb": _3, "trentins\xFCd-tirol": _3, "trentinsudtirol": _3, "xn--trentinsdtirol-nsb": _3, "trentins\xFCdtirol": _3, "trentinsued-tirol": _3, "trentinsuedtirol": _3, "tuscany": _3, "umb": _3, "umbria": _3, "val-d-aosta": _3, "val-daosta": _3, "vald-aosta": _3, "valdaosta": _3, "valle-aosta": _3, "valle-d-aosta": _3, "valle-daosta": _3, "valleaosta": _3, "valled-aosta": _3, "valledaosta": _3, "vallee-aoste": _3, "xn--valle-aoste-ebb": _3, "vall\xE9e-aoste": _3, "vallee-d-aoste": _3, "xn--valle-d-aoste-ehb": _3, "vall\xE9e-d-aoste": _3, "valleeaoste": _3, "xn--valleaoste-e7a": _3, "vall\xE9eaoste": _3, "valleedaoste": _3, "xn--valledaoste-ebb": _3, "vall\xE9edaoste": _3, "vao": _3, "vda": _3, "ven": _3, "veneto": _3, "ag": _3, "agrigento": _3, "al": _3, "alessandria": _3, "alto-adige": _3, "altoadige": _3, "an": _3, "ancona": _3, "andria-barletta-trani": _3, "andria-trani-barletta": _3, "andriabarlettatrani": _3, "andriatranibarletta": _3, "ao": _3, "aosta": _3, "aoste": _3, "ap": _3, "aq": _3, "aquila": _3, "ar": _3, "arezzo": _3, "ascoli-piceno": _3, "ascolipiceno": _3, "asti": _3, "at": _3, "av": _3, "avellino": _3, "ba": _3, "balsan": _3, "balsan-sudtirol": _3, "xn--balsan-sdtirol-nsb": _3, "balsan-s\xFCdtirol": _3, "balsan-suedtirol": _3, "bari": _3, "barletta-trani-andria": _3, "barlettatraniandria": _3, "belluno": _3, "benevento": _3, "bergamo": _3, "bg": _3, "bi": _3, "biella": _3, "bl": _3, "bn": _3, "bo": _3, "bologna": _3, "bolzano": _3, "bolzano-altoadige": _3, "bozen": _3, "bozen-sudtirol": _3, "xn--bozen-sdtirol-2ob": _3, "bozen-s\xFCdtirol": _3, "bozen-suedtirol": _3, "br": _3, "brescia": _3, "brindisi": _3, "bs": _3, "bt": _3, "bulsan": _3, "bulsan-sudtirol": _3, "xn--bulsan-sdtirol-nsb": _3, "bulsan-s\xFCdtirol": _3, "bulsan-suedtirol": _3, "bz": _3, "ca": _3, "cagliari": _3, "caltanissetta": _3, "campidano-medio": _3, "campidanomedio": _3, "campobasso": _3, "carbonia-iglesias": _3, "carboniaiglesias": _3, "carrara-massa": _3, "carraramassa": _3, "caserta": _3, "catania": _3, "catanzaro": _3, "cb": _3, "ce": _3, "cesena-forli": _3, "xn--cesena-forl-mcb": _3, "cesena-forl\xEC": _3, "cesenaforli": _3, "xn--cesenaforl-i8a": _3, "cesenaforl\xEC": _3, "ch": _3, "chieti": _3, "ci": _3, "cl": _3, "cn": _3, "co": _3, "como": _3, "cosenza": _3, "cr": _3, "cremona": _3, "crotone": _3, "cs": _3, "ct": _3, "cuneo": _3, "cz": _3, "dell-ogliastra": _3, "dellogliastra": _3, "en": _3, "enna": _3, "fc": _3, "fe": _3, "fermo": _3, "ferrara": _3, "fg": _3, "fi": _3, "firenze": _3, "florence": _3, "fm": _3, "foggia": _3, "forli-cesena": _3, "xn--forl-cesena-fcb": _3, "forl\xEC-cesena": _3, "forlicesena": _3, "xn--forlcesena-c8a": _3, "forl\xECcesena": _3, "fr": _3, "frosinone": _3, "ge": _3, "genoa": _3, "genova": _3, "go": _3, "gorizia": _3, "gr": _3, "grosseto": _3, "iglesias-carbonia": _3, "iglesiascarbonia": _3, "im": _3, "imperia": _3, "is": _3, "isernia": _3, "kr": _3, "la-spezia": _3, "laquila": _3, "laspezia": _3, "latina": _3, "lc": _3, "le": _3, "lecce": _3, "lecco": _3, "li": _3, "livorno": _3, "lo": _3, "lodi": _3, "lt": _3, "lu": _3, "lucca": _3, "macerata": _3, "mantova": _3, "massa-carrara": _3, "massacarrara": _3, "matera": _3, "mb": _3, "mc": _3, "me": _3, "medio-campidano": _3, "mediocampidano": _3, "messina": _3, "mi": _3, "milan": _3, "milano": _3, "mn": _3, "mo": _3, "modena": _3, "monza": _3, "monza-brianza": _3, "monza-e-della-brianza": _3, "monzabrianza": _3, "monzaebrianza": _3, "monzaedellabrianza": _3, "ms": _3, "mt": _3, "na": _3, "naples": _3, "napoli": _3, "no": _3, "novara": _3, "nu": _3, "nuoro": _3, "og": _3, "ogliastra": _3, "olbia-tempio": _3, "olbiatempio": _3, "or": _3, "oristano": _3, "ot": _3, "pa": _3, "padova": _3, "padua": _3, "palermo": _3, "parma": _3, "pavia": _3, "pc": _3, "pd": _3, "pe": _3, "perugia": _3, "pesaro-urbino": _3, "pesarourbino": _3, "pescara": _3, "pg": _3, "pi": _3, "piacenza": _3, "pisa": _3, "pistoia": _3, "pn": _3, "po": _3, "pordenone": _3, "potenza": _3, "pr": _3, "prato": _3, "pt": _3, "pu": _3, "pv": _3, "pz": _3, "ra": _3, "ragusa": _3, "ravenna": _3, "rc": _3, "re": _3, "reggio-calabria": _3, "reggio-emilia": _3, "reggiocalabria": _3, "reggioemilia": _3, "rg": _3, "ri": _3, "rieti": _3, "rimini": _3, "rm": _3, "rn": _3, "ro": _3, "roma": _3, "rome": _3, "rovigo": _3, "sa": _3, "salerno": _3, "sassari": _3, "savona": _3, "si": _3, "siena": _3, "siracusa": _3, "so": _3, "sondrio": _3, "sp": _3, "sr": _3, "ss": _3, "xn--sdtirol-n2a": _3, "s\xFCdtirol": _3, "suedtirol": _3, "sv": _3, "ta": _3, "taranto": _3, "te": _3, "tempio-olbia": _3, "tempioolbia": _3, "teramo": _3, "terni": _3, "tn": _3, "to": _3, "torino": _3, "tp": _3, "tr": _3, "trani-andria-barletta": _3, "trani-barletta-andria": _3, "traniandriabarletta": _3, "tranibarlettaandria": _3, "trapani": _3, "trento": _3, "treviso": _3, "trieste": _3, "ts": _3, "turin": _3, "tv": _3, "ud": _3, "udine": _3, "urbino-pesaro": _3, "urbinopesaro": _3, "va": _3, "varese": _3, "vb": _3, "vc": _3, "ve": _3, "venezia": _3, "venice": _3, "verbania": _3, "vercelli": _3, "verona": _3, "vi": _3, "vibo-valentia": _3, "vibovalentia": _3, "vicenza": _3, "viterbo": _3, "vr": _3, "vs": _3, "vt": _3, "vv": _3, "12chars": _4, "ibxos": _4, "iliadboxos": _4, "neen": [0, { "jc": _4 }], "123homepage": _4, "16-b": _4, "32-b": _4, "64-b": _4, "myspreadshop": _4, "syncloud": _4 }], "je": [1, { "co": _3, "net": _3, "org": _3, "of": _4 }], "jm": _18, "jo": [1, { "agri": _3, "ai": _3, "com": _3, "edu": _3, "eng": _3, "fm": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "per": _3, "phd": _3, "sch": _3, "tv": _3 }], "jobs": _3, "jp": [1, { "ac": _3, "ad": _3, "co": _3, "ed": _3, "go": _3, "gr": _3, "lg": _3, "ne": [1, { "aseinet": _50, "gehirn": _4, "ivory": _4, "mail-box": _4, "mints": _4, "mokuren": _4, "opal": _4, "sakura": _4, "sumomo": _4, "topaz": _4 }], "or": _3, "aichi": [1, { "aisai": _3, "ama": _3, "anjo": _3, "asuke": _3, "chiryu": _3, "chita": _3, "fuso": _3, "gamagori": _3, "handa": _3, "hazu": _3, "hekinan": _3, "higashiura": _3, "ichinomiya": _3, "inazawa": _3, "inuyama": _3, "isshiki": _3, "iwakura": _3, "kanie": _3, "kariya": _3, "kasugai": _3, "kira": _3, "kiyosu": _3, "komaki": _3, "konan": _3, "kota": _3, "mihama": _3, "miyoshi": _3, "nishio": _3, "nisshin": _3, "obu": _3, "oguchi": _3, "oharu": _3, "okazaki": _3, "owariasahi": _3, "seto": _3, "shikatsu": _3, "shinshiro": _3, "shitara": _3, "tahara": _3, "takahama": _3, "tobishima": _3, "toei": _3, "togo": _3, "tokai": _3, "tokoname": _3, "toyoake": _3, "toyohashi": _3, "toyokawa": _3, "toyone": _3, "toyota": _3, "tsushima": _3, "yatomi": _3 }], "akita": [1, { "akita": _3, "daisen": _3, "fujisato": _3, "gojome": _3, "hachirogata": _3, "happou": _3, "higashinaruse": _3, "honjo": _3, "honjyo": _3, "ikawa": _3, "kamikoani": _3, "kamioka": _3, "katagami": _3, "kazuno": _3, "kitaakita": _3, "kosaka": _3, "kyowa": _3, "misato": _3, "mitane": _3, "moriyoshi": _3, "nikaho": _3, "noshiro": _3, "odate": _3, "oga": _3, "ogata": _3, "semboku": _3, "yokote": _3, "yurihonjo": _3 }], "aomori": [1, { "aomori": _3, "gonohe": _3, "hachinohe": _3, "hashikami": _3, "hiranai": _3, "hirosaki": _3, "itayanagi": _3, "kuroishi": _3, "misawa": _3, "mutsu": _3, "nakadomari": _3, "noheji": _3, "oirase": _3, "owani": _3, "rokunohe": _3, "sannohe": _3, "shichinohe": _3, "shingo": _3, "takko": _3, "towada": _3, "tsugaru": _3, "tsuruta": _3 }], "chiba": [1, { "abiko": _3, "asahi": _3, "chonan": _3, "chosei": _3, "choshi": _3, "chuo": _3, "funabashi": _3, "futtsu": _3, "hanamigawa": _3, "ichihara": _3, "ichikawa": _3, "ichinomiya": _3, "inzai": _3, "isumi": _3, "kamagaya": _3, "kamogawa": _3, "kashiwa": _3, "katori": _3, "katsuura": _3, "kimitsu": _3, "kisarazu": _3, "kozaki": _3, "kujukuri": _3, "kyonan": _3, "matsudo": _3, "midori": _3, "mihama": _3, "minamiboso": _3, "mobara": _3, "mutsuzawa": _3, "nagara": _3, "nagareyama": _3, "narashino": _3, "narita": _3, "noda": _3, "oamishirasato": _3, "omigawa": _3, "onjuku": _3, "otaki": _3, "sakae": _3, "sakura": _3, "shimofusa": _3, "shirako": _3, "shiroi": _3, "shisui": _3, "sodegaura": _3, "sosa": _3, "tako": _3, "tateyama": _3, "togane": _3, "tohnosho": _3, "tomisato": _3, "urayasu": _3, "yachimata": _3, "yachiyo": _3, "yokaichiba": _3, "yokoshibahikari": _3, "yotsukaido": _3 }], "ehime": [1, { "ainan": _3, "honai": _3, "ikata": _3, "imabari": _3, "iyo": _3, "kamijima": _3, "kihoku": _3, "kumakogen": _3, "masaki": _3, "matsuno": _3, "matsuyama": _3, "namikata": _3, "niihama": _3, "ozu": _3, "saijo": _3, "seiyo": _3, "shikokuchuo": _3, "tobe": _3, "toon": _3, "uchiko": _3, "uwajima": _3, "yawatahama": _3 }], "fukui": [1, { "echizen": _3, "eiheiji": _3, "fukui": _3, "ikeda": _3, "katsuyama": _3, "mihama": _3, "minamiechizen": _3, "obama": _3, "ohi": _3, "ono": _3, "sabae": _3, "sakai": _3, "takahama": _3, "tsuruga": _3, "wakasa": _3 }], "fukuoka": [1, { "ashiya": _3, "buzen": _3, "chikugo": _3, "chikuho": _3, "chikujo": _3, "chikushino": _3, "chikuzen": _3, "chuo": _3, "dazaifu": _3, "fukuchi": _3, "hakata": _3, "higashi": _3, "hirokawa": _3, "hisayama": _3, "iizuka": _3, "inatsuki": _3, "kaho": _3, "kasuga": _3, "kasuya": _3, "kawara": _3, "keisen": _3, "koga": _3, "kurate": _3, "kurogi": _3, "kurume": _3, "minami": _3, "miyako": _3, "miyama": _3, "miyawaka": _3, "mizumaki": _3, "munakata": _3, "nakagawa": _3, "nakama": _3, "nishi": _3, "nogata": _3, "ogori": _3, "okagaki": _3, "okawa": _3, "oki": _3, "omuta": _3, "onga": _3, "onojo": _3, "oto": _3, "saigawa": _3, "sasaguri": _3, "shingu": _3, "shinyoshitomi": _3, "shonai": _3, "soeda": _3, "sue": _3, "tachiarai": _3, "tagawa": _3, "takata": _3, "toho": _3, "toyotsu": _3, "tsuiki": _3, "ukiha": _3, "umi": _3, "usui": _3, "yamada": _3, "yame": _3, "yanagawa": _3, "yukuhashi": _3 }], "fukushima": [1, { "aizubange": _3, "aizumisato": _3, "aizuwakamatsu": _3, "asakawa": _3, "bandai": _3, "date": _3, "fukushima": _3, "furudono": _3, "futaba": _3, "hanawa": _3, "higashi": _3, "hirata": _3, "hirono": _3, "iitate": _3, "inawashiro": _3, "ishikawa": _3, "iwaki": _3, "izumizaki": _3, "kagamiishi": _3, "kaneyama": _3, "kawamata": _3, "kitakata": _3, "kitashiobara": _3, "koori": _3, "koriyama": _3, "kunimi": _3, "miharu": _3, "mishima": _3, "namie": _3, "nango": _3, "nishiaizu": _3, "nishigo": _3, "okuma": _3, "omotego": _3, "ono": _3, "otama": _3, "samegawa": _3, "shimogo": _3, "shirakawa": _3, "showa": _3, "soma": _3, "sukagawa": _3, "taishin": _3, "tamakawa": _3, "tanagura": _3, "tenei": _3, "yabuki": _3, "yamato": _3, "yamatsuri": _3, "yanaizu": _3, "yugawa": _3 }], "gifu": [1, { "anpachi": _3, "ena": _3, "gifu": _3, "ginan": _3, "godo": _3, "gujo": _3, "hashima": _3, "hichiso": _3, "hida": _3, "higashishirakawa": _3, "ibigawa": _3, "ikeda": _3, "kakamigahara": _3, "kani": _3, "kasahara": _3, "kasamatsu": _3, "kawaue": _3, "kitagata": _3, "mino": _3, "minokamo": _3, "mitake": _3, "mizunami": _3, "motosu": _3, "nakatsugawa": _3, "ogaki": _3, "sakahogi": _3, "seki": _3, "sekigahara": _3, "shirakawa": _3, "tajimi": _3, "takayama": _3, "tarui": _3, "toki": _3, "tomika": _3, "wanouchi": _3, "yamagata": _3, "yaotsu": _3, "yoro": _3 }], "gunma": [1, { "annaka": _3, "chiyoda": _3, "fujioka": _3, "higashiagatsuma": _3, "isesaki": _3, "itakura": _3, "kanna": _3, "kanra": _3, "katashina": _3, "kawaba": _3, "kiryu": _3, "kusatsu": _3, "maebashi": _3, "meiwa": _3, "midori": _3, "minakami": _3, "naganohara": _3, "nakanojo": _3, "nanmoku": _3, "numata": _3, "oizumi": _3, "ora": _3, "ota": _3, "shibukawa": _3, "shimonita": _3, "shinto": _3, "showa": _3, "takasaki": _3, "takayama": _3, "tamamura": _3, "tatebayashi": _3, "tomioka": _3, "tsukiyono": _3, "tsumagoi": _3, "ueno": _3, "yoshioka": _3 }], "hiroshima": [1, { "asaminami": _3, "daiwa": _3, "etajima": _3, "fuchu": _3, "fukuyama": _3, "hatsukaichi": _3, "higashihiroshima": _3, "hongo": _3, "jinsekikogen": _3, "kaita": _3, "kui": _3, "kumano": _3, "kure": _3, "mihara": _3, "miyoshi": _3, "naka": _3, "onomichi": _3, "osakikamijima": _3, "otake": _3, "saka": _3, "sera": _3, "seranishi": _3, "shinichi": _3, "shobara": _3, "takehara": _3 }], "hokkaido": [1, { "abashiri": _3, "abira": _3, "aibetsu": _3, "akabira": _3, "akkeshi": _3, "asahikawa": _3, "ashibetsu": _3, "ashoro": _3, "assabu": _3, "atsuma": _3, "bibai": _3, "biei": _3, "bifuka": _3, "bihoro": _3, "biratori": _3, "chippubetsu": _3, "chitose": _3, "date": _3, "ebetsu": _3, "embetsu": _3, "eniwa": _3, "erimo": _3, "esan": _3, "esashi": _3, "fukagawa": _3, "fukushima": _3, "furano": _3, "furubira": _3, "haboro": _3, "hakodate": _3, "hamatonbetsu": _3, "hidaka": _3, "higashikagura": _3, "higashikawa": _3, "hiroo": _3, "hokuryu": _3, "hokuto": _3, "honbetsu": _3, "horokanai": _3, "horonobe": _3, "ikeda": _3, "imakane": _3, "ishikari": _3, "iwamizawa": _3, "iwanai": _3, "kamifurano": _3, "kamikawa": _3, "kamishihoro": _3, "kamisunagawa": _3, "kamoenai": _3, "kayabe": _3, "kembuchi": _3, "kikonai": _3, "kimobetsu": _3, "kitahiroshima": _3, "kitami": _3, "kiyosato": _3, "koshimizu": _3, "kunneppu": _3, "kuriyama": _3, "kuromatsunai": _3, "kushiro": _3, "kutchan": _3, "kyowa": _3, "mashike": _3, "matsumae": _3, "mikasa": _3, "minamifurano": _3, "mombetsu": _3, "moseushi": _3, "mukawa": _3, "muroran": _3, "naie": _3, "nakagawa": _3, "nakasatsunai": _3, "nakatombetsu": _3, "nanae": _3, "nanporo": _3, "nayoro": _3, "nemuro": _3, "niikappu": _3, "niki": _3, "nishiokoppe": _3, "noboribetsu": _3, "numata": _3, "obihiro": _3, "obira": _3, "oketo": _3, "okoppe": _3, "otaru": _3, "otobe": _3, "otofuke": _3, "otoineppu": _3, "oumu": _3, "ozora": _3, "pippu": _3, "rankoshi": _3, "rebun": _3, "rikubetsu": _3, "rishiri": _3, "rishirifuji": _3, "saroma": _3, "sarufutsu": _3, "shakotan": _3, "shari": _3, "shibecha": _3, "shibetsu": _3, "shikabe": _3, "shikaoi": _3, "shimamaki": _3, "shimizu": _3, "shimokawa": _3, "shinshinotsu": _3, "shintoku": _3, "shiranuka": _3, "shiraoi": _3, "shiriuchi": _3, "sobetsu": _3, "sunagawa": _3, "taiki": _3, "takasu": _3, "takikawa": _3, "takinoue": _3, "teshikaga": _3, "tobetsu": _3, "tohma": _3, "tomakomai": _3, "tomari": _3, "toya": _3, "toyako": _3, "toyotomi": _3, "toyoura": _3, "tsubetsu": _3, "tsukigata": _3, "urakawa": _3, "urausu": _3, "uryu": _3, "utashinai": _3, "wakkanai": _3, "wassamu": _3, "yakumo": _3, "yoichi": _3 }], "hyogo": [1, { "aioi": _3, "akashi": _3, "ako": _3, "amagasaki": _3, "aogaki": _3, "asago": _3, "ashiya": _3, "awaji": _3, "fukusaki": _3, "goshiki": _3, "harima": _3, "himeji": _3, "ichikawa": _3, "inagawa": _3, "itami": _3, "kakogawa": _3, "kamigori": _3, "kamikawa": _3, "kasai": _3, "kasuga": _3, "kawanishi": _3, "miki": _3, "minamiawaji": _3, "nishinomiya": _3, "nishiwaki": _3, "ono": _3, "sanda": _3, "sannan": _3, "sasayama": _3, "sayo": _3, "shingu": _3, "shinonsen": _3, "shiso": _3, "sumoto": _3, "taishi": _3, "taka": _3, "takarazuka": _3, "takasago": _3, "takino": _3, "tamba": _3, "tatsuno": _3, "toyooka": _3, "yabu": _3, "yashiro": _3, "yoka": _3, "yokawa": _3 }], "ibaraki": [1, { "ami": _3, "asahi": _3, "bando": _3, "chikusei": _3, "daigo": _3, "fujishiro": _3, "hitachi": _3, "hitachinaka": _3, "hitachiomiya": _3, "hitachiota": _3, "ibaraki": _3, "ina": _3, "inashiki": _3, "itako": _3, "iwama": _3, "joso": _3, "kamisu": _3, "kasama": _3, "kashima": _3, "kasumigaura": _3, "koga": _3, "miho": _3, "mito": _3, "moriya": _3, "naka": _3, "namegata": _3, "oarai": _3, "ogawa": _3, "omitama": _3, "ryugasaki": _3, "sakai": _3, "sakuragawa": _3, "shimodate": _3, "shimotsuma": _3, "shirosato": _3, "sowa": _3, "suifu": _3, "takahagi": _3, "tamatsukuri": _3, "tokai": _3, "tomobe": _3, "tone": _3, "toride": _3, "tsuchiura": _3, "tsukuba": _3, "uchihara": _3, "ushiku": _3, "yachiyo": _3, "yamagata": _3, "yawara": _3, "yuki": _3 }], "ishikawa": [1, { "anamizu": _3, "hakui": _3, "hakusan": _3, "kaga": _3, "kahoku": _3, "kanazawa": _3, "kawakita": _3, "komatsu": _3, "nakanoto": _3, "nanao": _3, "nomi": _3, "nonoichi": _3, "noto": _3, "shika": _3, "suzu": _3, "tsubata": _3, "tsurugi": _3, "uchinada": _3, "wajima": _3 }], "iwate": [1, { "fudai": _3, "fujisawa": _3, "hanamaki": _3, "hiraizumi": _3, "hirono": _3, "ichinohe": _3, "ichinoseki": _3, "iwaizumi": _3, "iwate": _3, "joboji": _3, "kamaishi": _3, "kanegasaki": _3, "karumai": _3, "kawai": _3, "kitakami": _3, "kuji": _3, "kunohe": _3, "kuzumaki": _3, "miyako": _3, "mizusawa": _3, "morioka": _3, "ninohe": _3, "noda": _3, "ofunato": _3, "oshu": _3, "otsuchi": _3, "rikuzentakata": _3, "shiwa": _3, "shizukuishi": _3, "sumita": _3, "tanohata": _3, "tono": _3, "yahaba": _3, "yamada": _3 }], "kagawa": [1, { "ayagawa": _3, "higashikagawa": _3, "kanonji": _3, "kotohira": _3, "manno": _3, "marugame": _3, "mitoyo": _3, "naoshima": _3, "sanuki": _3, "tadotsu": _3, "takamatsu": _3, "tonosho": _3, "uchinomi": _3, "utazu": _3, "zentsuji": _3 }], "kagoshima": [1, { "akune": _3, "amami": _3, "hioki": _3, "isa": _3, "isen": _3, "izumi": _3, "kagoshima": _3, "kanoya": _3, "kawanabe": _3, "kinko": _3, "kouyama": _3, "makurazaki": _3, "matsumoto": _3, "minamitane": _3, "nakatane": _3, "nishinoomote": _3, "satsumasendai": _3, "soo": _3, "tarumizu": _3, "yusui": _3 }], "kanagawa": [1, { "aikawa": _3, "atsugi": _3, "ayase": _3, "chigasaki": _3, "ebina": _3, "fujisawa": _3, "hadano": _3, "hakone": _3, "hiratsuka": _3, "isehara": _3, "kaisei": _3, "kamakura": _3, "kiyokawa": _3, "matsuda": _3, "minamiashigara": _3, "miura": _3, "nakai": _3, "ninomiya": _3, "odawara": _3, "oi": _3, "oiso": _3, "sagamihara": _3, "samukawa": _3, "tsukui": _3, "yamakita": _3, "yamato": _3, "yokosuka": _3, "yugawara": _3, "zama": _3, "zushi": _3 }], "kochi": [1, { "aki": _3, "geisei": _3, "hidaka": _3, "higashitsuno": _3, "ino": _3, "kagami": _3, "kami": _3, "kitagawa": _3, "kochi": _3, "mihara": _3, "motoyama": _3, "muroto": _3, "nahari": _3, "nakamura": _3, "nankoku": _3, "nishitosa": _3, "niyodogawa": _3, "ochi": _3, "okawa": _3, "otoyo": _3, "otsuki": _3, "sakawa": _3, "sukumo": _3, "susaki": _3, "tosa": _3, "tosashimizu": _3, "toyo": _3, "tsuno": _3, "umaji": _3, "yasuda": _3, "yusuhara": _3 }], "kumamoto": [1, { "amakusa": _3, "arao": _3, "aso": _3, "choyo": _3, "gyokuto": _3, "kamiamakusa": _3, "kikuchi": _3, "kumamoto": _3, "mashiki": _3, "mifune": _3, "minamata": _3, "minamioguni": _3, "nagasu": _3, "nishihara": _3, "oguni": _3, "ozu": _3, "sumoto": _3, "takamori": _3, "uki": _3, "uto": _3, "yamaga": _3, "yamato": _3, "yatsushiro": _3 }], "kyoto": [1, { "ayabe": _3, "fukuchiyama": _3, "higashiyama": _3, "ide": _3, "ine": _3, "joyo": _3, "kameoka": _3, "kamo": _3, "kita": _3, "kizu": _3, "kumiyama": _3, "kyotamba": _3, "kyotanabe": _3, "kyotango": _3, "maizuru": _3, "minami": _3, "minamiyamashiro": _3, "miyazu": _3, "muko": _3, "nagaokakyo": _3, "nakagyo": _3, "nantan": _3, "oyamazaki": _3, "sakyo": _3, "seika": _3, "tanabe": _3, "uji": _3, "ujitawara": _3, "wazuka": _3, "yamashina": _3, "yawata": _3 }], "mie": [1, { "asahi": _3, "inabe": _3, "ise": _3, "kameyama": _3, "kawagoe": _3, "kiho": _3, "kisosaki": _3, "kiwa": _3, "komono": _3, "kumano": _3, "kuwana": _3, "matsusaka": _3, "meiwa": _3, "mihama": _3, "minamiise": _3, "misugi": _3, "miyama": _3, "nabari": _3, "shima": _3, "suzuka": _3, "tado": _3, "taiki": _3, "taki": _3, "tamaki": _3, "toba": _3, "tsu": _3, "udono": _3, "ureshino": _3, "watarai": _3, "yokkaichi": _3 }], "miyagi": [1, { "furukawa": _3, "higashimatsushima": _3, "ishinomaki": _3, "iwanuma": _3, "kakuda": _3, "kami": _3, "kawasaki": _3, "marumori": _3, "matsushima": _3, "minamisanriku": _3, "misato": _3, "murata": _3, "natori": _3, "ogawara": _3, "ohira": _3, "onagawa": _3, "osaki": _3, "rifu": _3, "semine": _3, "shibata": _3, "shichikashuku": _3, "shikama": _3, "shiogama": _3, "shiroishi": _3, "tagajo": _3, "taiwa": _3, "tome": _3, "tomiya": _3, "wakuya": _3, "watari": _3, "yamamoto": _3, "zao": _3 }], "miyazaki": [1, { "aya": _3, "ebino": _3, "gokase": _3, "hyuga": _3, "kadogawa": _3, "kawaminami": _3, "kijo": _3, "kitagawa": _3, "kitakata": _3, "kitaura": _3, "kobayashi": _3, "kunitomi": _3, "kushima": _3, "mimata": _3, "miyakonojo": _3, "miyazaki": _3, "morotsuka": _3, "nichinan": _3, "nishimera": _3, "nobeoka": _3, "saito": _3, "shiiba": _3, "shintomi": _3, "takaharu": _3, "takanabe": _3, "takazaki": _3, "tsuno": _3 }], "nagano": [1, { "achi": _3, "agematsu": _3, "anan": _3, "aoki": _3, "asahi": _3, "azumino": _3, "chikuhoku": _3, "chikuma": _3, "chino": _3, "fujimi": _3, "hakuba": _3, "hara": _3, "hiraya": _3, "iida": _3, "iijima": _3, "iiyama": _3, "iizuna": _3, "ikeda": _3, "ikusaka": _3, "ina": _3, "karuizawa": _3, "kawakami": _3, "kiso": _3, "kisofukushima": _3, "kitaaiki": _3, "komagane": _3, "komoro": _3, "matsukawa": _3, "matsumoto": _3, "miasa": _3, "minamiaiki": _3, "minamimaki": _3, "minamiminowa": _3, "minowa": _3, "miyada": _3, "miyota": _3, "mochizuki": _3, "nagano": _3, "nagawa": _3, "nagiso": _3, "nakagawa": _3, "nakano": _3, "nozawaonsen": _3, "obuse": _3, "ogawa": _3, "okaya": _3, "omachi": _3, "omi": _3, "ookuwa": _3, "ooshika": _3, "otaki": _3, "otari": _3, "sakae": _3, "sakaki": _3, "saku": _3, "sakuho": _3, "shimosuwa": _3, "shinanomachi": _3, "shiojiri": _3, "suwa": _3, "suzaka": _3, "takagi": _3, "takamori": _3, "takayama": _3, "tateshina": _3, "tatsuno": _3, "togakushi": _3, "togura": _3, "tomi": _3, "ueda": _3, "wada": _3, "yamagata": _3, "yamanouchi": _3, "yasaka": _3, "yasuoka": _3 }], "nagasaki": [1, { "chijiwa": _3, "futsu": _3, "goto": _3, "hasami": _3, "hirado": _3, "iki": _3, "isahaya": _3, "kawatana": _3, "kuchinotsu": _3, "matsuura": _3, "nagasaki": _3, "obama": _3, "omura": _3, "oseto": _3, "saikai": _3, "sasebo": _3, "seihi": _3, "shimabara": _3, "shinkamigoto": _3, "togitsu": _3, "tsushima": _3, "unzen": _3 }], "nara": [1, { "ando": _3, "gose": _3, "heguri": _3, "higashiyoshino": _3, "ikaruga": _3, "ikoma": _3, "kamikitayama": _3, "kanmaki": _3, "kashiba": _3, "kashihara": _3, "katsuragi": _3, "kawai": _3, "kawakami": _3, "kawanishi": _3, "koryo": _3, "kurotaki": _3, "mitsue": _3, "miyake": _3, "nara": _3, "nosegawa": _3, "oji": _3, "ouda": _3, "oyodo": _3, "sakurai": _3, "sango": _3, "shimoichi": _3, "shimokitayama": _3, "shinjo": _3, "soni": _3, "takatori": _3, "tawaramoto": _3, "tenkawa": _3, "tenri": _3, "uda": _3, "yamatokoriyama": _3, "yamatotakada": _3, "yamazoe": _3, "yoshino": _3 }], "niigata": [1, { "aga": _3, "agano": _3, "gosen": _3, "itoigawa": _3, "izumozaki": _3, "joetsu": _3, "kamo": _3, "kariwa": _3, "kashiwazaki": _3, "minamiuonuma": _3, "mitsuke": _3, "muika": _3, "murakami": _3, "myoko": _3, "nagaoka": _3, "niigata": _3, "ojiya": _3, "omi": _3, "sado": _3, "sanjo": _3, "seiro": _3, "seirou": _3, "sekikawa": _3, "shibata": _3, "tagami": _3, "tainai": _3, "tochio": _3, "tokamachi": _3, "tsubame": _3, "tsunan": _3, "uonuma": _3, "yahiko": _3, "yoita": _3, "yuzawa": _3 }], "oita": [1, { "beppu": _3, "bungoono": _3, "bungotakada": _3, "hasama": _3, "hiji": _3, "himeshima": _3, "hita": _3, "kamitsue": _3, "kokonoe": _3, "kuju": _3, "kunisaki": _3, "kusu": _3, "oita": _3, "saiki": _3, "taketa": _3, "tsukumi": _3, "usa": _3, "usuki": _3, "yufu": _3 }], "okayama": [1, { "akaiwa": _3, "asakuchi": _3, "bizen": _3, "hayashima": _3, "ibara": _3, "kagamino": _3, "kasaoka": _3, "kibichuo": _3, "kumenan": _3, "kurashiki": _3, "maniwa": _3, "misaki": _3, "nagi": _3, "niimi": _3, "nishiawakura": _3, "okayama": _3, "satosho": _3, "setouchi": _3, "shinjo": _3, "shoo": _3, "soja": _3, "takahashi": _3, "tamano": _3, "tsuyama": _3, "wake": _3, "yakage": _3 }], "okinawa": [1, { "aguni": _3, "ginowan": _3, "ginoza": _3, "gushikami": _3, "haebaru": _3, "higashi": _3, "hirara": _3, "iheya": _3, "ishigaki": _3, "ishikawa": _3, "itoman": _3, "izena": _3, "kadena": _3, "kin": _3, "kitadaito": _3, "kitanakagusuku": _3, "kumejima": _3, "kunigami": _3, "minamidaito": _3, "motobu": _3, "nago": _3, "naha": _3, "nakagusuku": _3, "nakijin": _3, "nanjo": _3, "nishihara": _3, "ogimi": _3, "okinawa": _3, "onna": _3, "shimoji": _3, "taketomi": _3, "tarama": _3, "tokashiki": _3, "tomigusuku": _3, "tonaki": _3, "urasoe": _3, "uruma": _3, "yaese": _3, "yomitan": _3, "yonabaru": _3, "yonaguni": _3, "zamami": _3 }], "osaka": [1, { "abeno": _3, "chihayaakasaka": _3, "chuo": _3, "daito": _3, "fujiidera": _3, "habikino": _3, "hannan": _3, "higashiosaka": _3, "higashisumiyoshi": _3, "higashiyodogawa": _3, "hirakata": _3, "ibaraki": _3, "ikeda": _3, "izumi": _3, "izumiotsu": _3, "izumisano": _3, "kadoma": _3, "kaizuka": _3, "kanan": _3, "kashiwara": _3, "katano": _3, "kawachinagano": _3, "kishiwada": _3, "kita": _3, "kumatori": _3, "matsubara": _3, "minato": _3, "minoh": _3, "misaki": _3, "moriguchi": _3, "neyagawa": _3, "nishi": _3, "nose": _3, "osakasayama": _3, "sakai": _3, "sayama": _3, "sennan": _3, "settsu": _3, "shijonawate": _3, "shimamoto": _3, "suita": _3, "tadaoka": _3, "taishi": _3, "tajiri": _3, "takaishi": _3, "takatsuki": _3, "tondabayashi": _3, "toyonaka": _3, "toyono": _3, "yao": _3 }], "saga": [1, { "ariake": _3, "arita": _3, "fukudomi": _3, "genkai": _3, "hamatama": _3, "hizen": _3, "imari": _3, "kamimine": _3, "kanzaki": _3, "karatsu": _3, "kashima": _3, "kitagata": _3, "kitahata": _3, "kiyama": _3, "kouhoku": _3, "kyuragi": _3, "nishiarita": _3, "ogi": _3, "omachi": _3, "ouchi": _3, "saga": _3, "shiroishi": _3, "taku": _3, "tara": _3, "tosu": _3, "yoshinogari": _3 }], "saitama": [1, { "arakawa": _3, "asaka": _3, "chichibu": _3, "fujimi": _3, "fujimino": _3, "fukaya": _3, "hanno": _3, "hanyu": _3, "hasuda": _3, "hatogaya": _3, "hatoyama": _3, "hidaka": _3, "higashichichibu": _3, "higashimatsuyama": _3, "honjo": _3, "ina": _3, "iruma": _3, "iwatsuki": _3, "kamiizumi": _3, "kamikawa": _3, "kamisato": _3, "kasukabe": _3, "kawagoe": _3, "kawaguchi": _3, "kawajima": _3, "kazo": _3, "kitamoto": _3, "koshigaya": _3, "kounosu": _3, "kuki": _3, "kumagaya": _3, "matsubushi": _3, "minano": _3, "misato": _3, "miyashiro": _3, "miyoshi": _3, "moroyama": _3, "nagatoro": _3, "namegawa": _3, "niiza": _3, "ogano": _3, "ogawa": _3, "ogose": _3, "okegawa": _3, "omiya": _3, "otaki": _3, "ranzan": _3, "ryokami": _3, "saitama": _3, "sakado": _3, "satte": _3, "sayama": _3, "shiki": _3, "shiraoka": _3, "soka": _3, "sugito": _3, "toda": _3, "tokigawa": _3, "tokorozawa": _3, "tsurugashima": _3, "urawa": _3, "warabi": _3, "yashio": _3, "yokoze": _3, "yono": _3, "yorii": _3, "yoshida": _3, "yoshikawa": _3, "yoshimi": _3 }], "shiga": [1, { "aisho": _3, "gamo": _3, "higashiomi": _3, "hikone": _3, "koka": _3, "konan": _3, "kosei": _3, "koto": _3, "kusatsu": _3, "maibara": _3, "moriyama": _3, "nagahama": _3, "nishiazai": _3, "notogawa": _3, "omihachiman": _3, "otsu": _3, "ritto": _3, "ryuoh": _3, "takashima": _3, "takatsuki": _3, "torahime": _3, "toyosato": _3, "yasu": _3 }], "shimane": [1, { "akagi": _3, "ama": _3, "gotsu": _3, "hamada": _3, "higashiizumo": _3, "hikawa": _3, "hikimi": _3, "izumo": _3, "kakinoki": _3, "masuda": _3, "matsue": _3, "misato": _3, "nishinoshima": _3, "ohda": _3, "okinoshima": _3, "okuizumo": _3, "shimane": _3, "tamayu": _3, "tsuwano": _3, "unnan": _3, "yakumo": _3, "yasugi": _3, "yatsuka": _3 }], "shizuoka": [1, { "arai": _3, "atami": _3, "fuji": _3, "fujieda": _3, "fujikawa": _3, "fujinomiya": _3, "fukuroi": _3, "gotemba": _3, "haibara": _3, "hamamatsu": _3, "higashiizu": _3, "ito": _3, "iwata": _3, "izu": _3, "izunokuni": _3, "kakegawa": _3, "kannami": _3, "kawanehon": _3, "kawazu": _3, "kikugawa": _3, "kosai": _3, "makinohara": _3, "matsuzaki": _3, "minamiizu": _3, "mishima": _3, "morimachi": _3, "nishiizu": _3, "numazu": _3, "omaezaki": _3, "shimada": _3, "shimizu": _3, "shimoda": _3, "shizuoka": _3, "susono": _3, "yaizu": _3, "yoshida": _3 }], "tochigi": [1, { "ashikaga": _3, "bato": _3, "haga": _3, "ichikai": _3, "iwafune": _3, "kaminokawa": _3, "kanuma": _3, "karasuyama": _3, "kuroiso": _3, "mashiko": _3, "mibu": _3, "moka": _3, "motegi": _3, "nasu": _3, "nasushiobara": _3, "nikko": _3, "nishikata": _3, "nogi": _3, "ohira": _3, "ohtawara": _3, "oyama": _3, "sakura": _3, "sano": _3, "shimotsuke": _3, "shioya": _3, "takanezawa": _3, "tochigi": _3, "tsuga": _3, "ujiie": _3, "utsunomiya": _3, "yaita": _3 }], "tokushima": [1, { "aizumi": _3, "anan": _3, "ichiba": _3, "itano": _3, "kainan": _3, "komatsushima": _3, "matsushige": _3, "mima": _3, "minami": _3, "miyoshi": _3, "mugi": _3, "nakagawa": _3, "naruto": _3, "sanagochi": _3, "shishikui": _3, "tokushima": _3, "wajiki": _3 }], "tokyo": [1, { "adachi": _3, "akiruno": _3, "akishima": _3, "aogashima": _3, "arakawa": _3, "bunkyo": _3, "chiyoda": _3, "chofu": _3, "chuo": _3, "edogawa": _3, "fuchu": _3, "fussa": _3, "hachijo": _3, "hachioji": _3, "hamura": _3, "higashikurume": _3, "higashimurayama": _3, "higashiyamato": _3, "hino": _3, "hinode": _3, "hinohara": _3, "inagi": _3, "itabashi": _3, "katsushika": _3, "kita": _3, "kiyose": _3, "kodaira": _3, "koganei": _3, "kokubunji": _3, "komae": _3, "koto": _3, "kouzushima": _3, "kunitachi": _3, "machida": _3, "meguro": _3, "minato": _3, "mitaka": _3, "mizuho": _3, "musashimurayama": _3, "musashino": _3, "nakano": _3, "nerima": _3, "ogasawara": _3, "okutama": _3, "ome": _3, "oshima": _3, "ota": _3, "setagaya": _3, "shibuya": _3, "shinagawa": _3, "shinjuku": _3, "suginami": _3, "sumida": _3, "tachikawa": _3, "taito": _3, "tama": _3, "toshima": _3 }], "tottori": [1, { "chizu": _3, "hino": _3, "kawahara": _3, "koge": _3, "kotoura": _3, "misasa": _3, "nanbu": _3, "nichinan": _3, "sakaiminato": _3, "tottori": _3, "wakasa": _3, "yazu": _3, "yonago": _3 }], "toyama": [1, { "asahi": _3, "fuchu": _3, "fukumitsu": _3, "funahashi": _3, "himi": _3, "imizu": _3, "inami": _3, "johana": _3, "kamiichi": _3, "kurobe": _3, "nakaniikawa": _3, "namerikawa": _3, "nanto": _3, "nyuzen": _3, "oyabe": _3, "taira": _3, "takaoka": _3, "tateyama": _3, "toga": _3, "tonami": _3, "toyama": _3, "unazuki": _3, "uozu": _3, "yamada": _3 }], "wakayama": [1, { "arida": _3, "aridagawa": _3, "gobo": _3, "hashimoto": _3, "hidaka": _3, "hirogawa": _3, "inami": _3, "iwade": _3, "kainan": _3, "kamitonda": _3, "katsuragi": _3, "kimino": _3, "kinokawa": _3, "kitayama": _3, "koya": _3, "koza": _3, "kozagawa": _3, "kudoyama": _3, "kushimoto": _3, "mihama": _3, "misato": _3, "nachikatsuura": _3, "shingu": _3, "shirahama": _3, "taiji": _3, "tanabe": _3, "wakayama": _3, "yuasa": _3, "yura": _3 }], "yamagata": [1, { "asahi": _3, "funagata": _3, "higashine": _3, "iide": _3, "kahoku": _3, "kaminoyama": _3, "kaneyama": _3, "kawanishi": _3, "mamurogawa": _3, "mikawa": _3, "murayama": _3, "nagai": _3, "nakayama": _3, "nanyo": _3, "nishikawa": _3, "obanazawa": _3, "oe": _3, "oguni": _3, "ohkura": _3, "oishida": _3, "sagae": _3, "sakata": _3, "sakegawa": _3, "shinjo": _3, "shirataka": _3, "shonai": _3, "takahata": _3, "tendo": _3, "tozawa": _3, "tsuruoka": _3, "yamagata": _3, "yamanobe": _3, "yonezawa": _3, "yuza": _3 }], "yamaguchi": [1, { "abu": _3, "hagi": _3, "hikari": _3, "hofu": _3, "iwakuni": _3, "kudamatsu": _3, "mitou": _3, "nagato": _3, "oshima": _3, "shimonoseki": _3, "shunan": _3, "tabuse": _3, "tokuyama": _3, "toyota": _3, "ube": _3, "yuu": _3 }], "yamanashi": [1, { "chuo": _3, "doshi": _3, "fuefuki": _3, "fujikawa": _3, "fujikawaguchiko": _3, "fujiyoshida": _3, "hayakawa": _3, "hokuto": _3, "ichikawamisato": _3, "kai": _3, "kofu": _3, "koshu": _3, "kosuge": _3, "minami-alps": _3, "minobu": _3, "nakamichi": _3, "nanbu": _3, "narusawa": _3, "nirasaki": _3, "nishikatsura": _3, "oshino": _3, "otsuki": _3, "showa": _3, "tabayama": _3, "tsuru": _3, "uenohara": _3, "yamanakako": _3, "yamanashi": _3 }], "xn--ehqz56n": _3, "\u4E09\u91CD": _3, "xn--1lqs03n": _3, "\u4EAC\u90FD": _3, "xn--qqqt11m": _3, "\u4F50\u8CC0": _3, "xn--f6qx53a": _3, "\u5175\u5EAB": _3, "xn--djrs72d6uy": _3, "\u5317\u6D77\u9053": _3, "xn--mkru45i": _3, "\u5343\u8449": _3, "xn--0trq7p7nn": _3, "\u548C\u6B4C\u5C71": _3, "xn--5js045d": _3, "\u57FC\u7389": _3, "xn--kbrq7o": _3, "\u5927\u5206": _3, "xn--pssu33l": _3, "\u5927\u962A": _3, "xn--ntsq17g": _3, "\u5948\u826F": _3, "xn--uisz3g": _3, "\u5BAE\u57CE": _3, "xn--6btw5a": _3, "\u5BAE\u5D0E": _3, "xn--1ctwo": _3, "\u5BCC\u5C71": _3, "xn--6orx2r": _3, "\u5C71\u53E3": _3, "xn--rht61e": _3, "\u5C71\u5F62": _3, "xn--rht27z": _3, "\u5C71\u68A8": _3, "xn--nit225k": _3, "\u5C90\u961C": _3, "xn--rht3d": _3, "\u5CA1\u5C71": _3, "xn--djty4k": _3, "\u5CA9\u624B": _3, "xn--klty5x": _3, "\u5CF6\u6839": _3, "xn--kltx9a": _3, "\u5E83\u5CF6": _3, "xn--kltp7d": _3, "\u5FB3\u5CF6": _3, "xn--c3s14m": _3, "\u611B\u5A9B": _3, "xn--vgu402c": _3, "\u611B\u77E5": _3, "xn--efvn9s": _3, "\u65B0\u6F5F": _3, "xn--1lqs71d": _3, "\u6771\u4EAC": _3, "xn--4pvxs": _3, "\u6803\u6728": _3, "xn--uuwu58a": _3, "\u6C96\u7E04": _3, "xn--zbx025d": _3, "\u6ECB\u8CC0": _3, "xn--8pvr4u": _3, "\u718A\u672C": _3, "xn--5rtp49c": _3, "\u77F3\u5DDD": _3, "xn--ntso0iqx3a": _3, "\u795E\u5948\u5DDD": _3, "xn--elqq16h": _3, "\u798F\u4E95": _3, "xn--4it168d": _3, "\u798F\u5CA1": _3, "xn--klt787d": _3, "\u798F\u5CF6": _3, "xn--rny31h": _3, "\u79CB\u7530": _3, "xn--7t0a264c": _3, "\u7FA4\u99AC": _3, "xn--uist22h": _3, "\u8328\u57CE": _3, "xn--8ltr62k": _3, "\u9577\u5D0E": _3, "xn--2m4a15e": _3, "\u9577\u91CE": _3, "xn--32vp30h": _3, "\u9752\u68EE": _3, "xn--4it797k": _3, "\u9759\u5CA1": _3, "xn--5rtq34k": _3, "\u9999\u5DDD": _3, "xn--k7yn95e": _3, "\u9AD8\u77E5": _3, "xn--tor131o": _3, "\u9CE5\u53D6": _3, "xn--d5qv7z876c": _3, "\u9E7F\u5150\u5CF6": _3, "kawasaki": _18, "kitakyushu": _18, "kobe": _18, "nagoya": _18, "sapporo": _18, "sendai": _18, "yokohama": _18, "buyshop": _4, "fashionstore": _4, "handcrafted": _4, "kawaiishop": _4, "supersale": _4, "theshop": _4, "0am": _4, "0g0": _4, "0j0": _4, "0t0": _4, "mydns": _4, "pgw": _4, "wjg": _4, "usercontent": _4, "angry": _4, "babyblue": _4, "babymilk": _4, "backdrop": _4, "bambina": _4, "bitter": _4, "blush": _4, "boo": _4, "boy": _4, "boyfriend": _4, "but": _4, "candypop": _4, "capoo": _4, "catfood": _4, "cheap": _4, "chicappa": _4, "chillout": _4, "chips": _4, "chowder": _4, "chu": _4, "ciao": _4, "cocotte": _4, "coolblog": _4, "cranky": _4, "cutegirl": _4, "daa": _4, "deca": _4, "deci": _4, "digick": _4, "egoism": _4, "fakefur": _4, "fem": _4, "flier": _4, "floppy": _4, "fool": _4, "frenchkiss": _4, "girlfriend": _4, "girly": _4, "gloomy": _4, "gonna": _4, "greater": _4, "hacca": _4, "heavy": _4, "her": _4, "hiho": _4, "hippy": _4, "holy": _4, "hungry": _4, "icurus": _4, "itigo": _4, "jellybean": _4, "kikirara": _4, "kill": _4, "kilo": _4, "kuron": _4, "littlestar": _4, "lolipopmc": _4, "lolitapunk": _4, "lomo": _4, "lovepop": _4, "lovesick": _4, "main": _4, "mods": _4, "mond": _4, "mongolian": _4, "moo": _4, "namaste": _4, "nikita": _4, "nobushi": _4, "noor": _4, "oops": _4, "parallel": _4, "parasite": _4, "pecori": _4, "peewee": _4, "penne": _4, "pepper": _4, "perma": _4, "pigboat": _4, "pinoko": _4, "punyu": _4, "pupu": _4, "pussycat": _4, "pya": _4, "raindrop": _4, "readymade": _4, "sadist": _4, "schoolbus": _4, "secret": _4, "staba": _4, "stripper": _4, "sub": _4, "sunnyday": _4, "thick": _4, "tonkotsu": _4, "under": _4, "upper": _4, "velvet": _4, "verse": _4, "versus": _4, "vivian": _4, "watson": _4, "weblike": _4, "whitesnow": _4, "zombie": _4, "hateblo": _4, "hatenablog": _4, "hatenadiary": _4, "2-d": _4, "bona": _4, "crap": _4, "daynight": _4, "eek": _4, "flop": _4, "halfmoon": _4, "jeez": _4, "matrix": _4, "mimoza": _4, "netgamers": _4, "nyanta": _4, "o0o0": _4, "rdy": _4, "rgr": _4, "rulez": _4, "sakurastorage": [0, { "isk01": _55, "isk02": _55 }], "saloon": _4, "sblo": _4, "skr": _4, "tank": _4, "uh-oh": _4, "undo": _4, "webaccel": [0, { "rs": _4, "user": _4 }], "websozai": _4, "xii": _4 }], "ke": [1, { "ac": _3, "co": _3, "go": _3, "info": _3, "me": _3, "mobi": _3, "ne": _3, "or": _3, "sc": _3 }], "kg": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "us": _4 }], "kh": _18, "ki": _56, "km": [1, { "ass": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "nom": _3, "org": _3, "prd": _3, "tm": _3, "asso": _3, "coop": _3, "gouv": _3, "medecin": _3, "notaires": _3, "pharmaciens": _3, "presse": _3, "veterinaire": _3 }], "kn": [1, { "edu": _3, "gov": _3, "net": _3, "org": _3 }], "kp": [1, { "com": _3, "edu": _3, "gov": _3, "org": _3, "rep": _3, "tra": _3 }], "kr": [1, { "ac": _3, "ai": _3, "co": _3, "es": _3, "go": _3, "hs": _3, "io": _3, "it": _3, "kg": _3, "me": _3, "mil": _3, "ms": _3, "ne": _3, "or": _3, "pe": _3, "re": _3, "sc": _3, "busan": _3, "chungbuk": _3, "chungnam": _3, "daegu": _3, "daejeon": _3, "gangwon": _3, "gwangju": _3, "gyeongbuk": _3, "gyeonggi": _3, "gyeongnam": _3, "incheon": _3, "jeju": _3, "jeonbuk": _3, "jeonnam": _3, "seoul": _3, "ulsan": _3, "c01": _4, "eliv-dns": _4 }], "kw": [1, { "com": _3, "edu": _3, "emb": _3, "gov": _3, "ind": _3, "net": _3, "org": _3 }], "ky": _45, "kz": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "jcloud": _4 }], "la": [1, { "com": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "net": _3, "org": _3, "per": _3, "bnr": _4 }], "lb": _5, "lc": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "oy": _4 }], "li": _3, "lk": [1, { "ac": _3, "assn": _3, "com": _3, "edu": _3, "gov": _3, "grp": _3, "hotel": _3, "int": _3, "ltd": _3, "net": _3, "ngo": _3, "org": _3, "sch": _3, "soc": _3, "web": _3 }], "lr": _5, "ls": [1, { "ac": _3, "biz": _3, "co": _3, "edu": _3, "gov": _3, "info": _3, "net": _3, "org": _3, "sc": _3 }], "lt": _11, "lu": [1, { "123website": _4 }], "lv": [1, { "asn": _3, "com": _3, "conf": _3, "edu": _3, "gov": _3, "id": _3, "mil": _3, "net": _3, "org": _3 }], "ly": [1, { "com": _3, "edu": _3, "gov": _3, "id": _3, "med": _3, "net": _3, "org": _3, "plc": _3, "sch": _3 }], "ma": [1, { "ac": _3, "co": _3, "gov": _3, "net": _3, "org": _3, "press": _3 }], "mc": [1, { "asso": _3, "tm": _3 }], "md": [1, { "ir": _4 }], "me": [1, { "ac": _3, "co": _3, "edu": _3, "gov": _3, "its": _3, "net": _3, "org": _3, "priv": _3, "c66": _4, "craft": _4, "edgestack": _4, "filegear": _4, "glitch": _4, "filegear-sg": _4, "lohmus": _4, "barsy": _4, "mcdir": _4, "brasilia": _4, "ddns": _4, "dnsfor": _4, "hopto": _4, "loginto": _4, "noip": _4, "webhop": _4, "soundcast": _4, "tcp4": _4, "vp4": _4, "diskstation": _4, "dscloud": _4, "i234": _4, "myds": _4, "synology": _4, "transip": _44, "nohost": _4 }], "mg": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "nom": _3, "org": _3, "prd": _3 }], "mh": _3, "mil": _3, "mk": [1, { "com": _3, "edu": _3, "gov": _3, "inf": _3, "name": _3, "net": _3, "org": _3 }], "ml": [1, { "ac": _3, "art": _3, "asso": _3, "com": _3, "edu": _3, "gouv": _3, "gov": _3, "info": _3, "inst": _3, "net": _3, "org": _3, "pr": _3, "presse": _3 }], "mm": _18, "mn": [1, { "edu": _3, "gov": _3, "org": _3, "nyc": _4 }], "mo": _5, "mobi": [1, { "barsy": _4, "dscloud": _4 }], "mp": [1, { "ju": _4 }], "mq": _3, "mr": _11, "ms": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "minisite": _4 }], "mt": _45, "mu": [1, { "ac": _3, "co": _3, "com": _3, "gov": _3, "net": _3, "or": _3, "org": _3 }], "museum": _3, "mv": [1, { "aero": _3, "biz": _3, "com": _3, "coop": _3, "edu": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "museum": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "mw": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "coop": _3, "edu": _3, "gov": _3, "int": _3, "net": _3, "org": _3 }], "mx": [1, { "com": _3, "edu": _3, "gob": _3, "net": _3, "org": _3 }], "my": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "name": _3, "net": _3, "org": _3 }], "mz": [1, { "ac": _3, "adv": _3, "co": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "na": [1, { "alt": _3, "co": _3, "com": _3, "gov": _3, "net": _3, "org": _3 }], "name": [1, { "her": _59, "his": _59 }], "nc": [1, { "asso": _3, "nom": _3 }], "ne": _3, "net": [1, { "adobeaemcloud": _4, "adobeio-static": _4, "adobeioruntime": _4, "akadns": _4, "akamai": _4, "akamai-staging": _4, "akamaiedge": _4, "akamaiedge-staging": _4, "akamaihd": _4, "akamaihd-staging": _4, "akamaiorigin": _4, "akamaiorigin-staging": _4, "akamaized": _4, "akamaized-staging": _4, "edgekey": _4, "edgekey-staging": _4, "edgesuite": _4, "edgesuite-staging": _4, "alwaysdata": _4, "myamaze": _4, "cloudfront": _4, "appudo": _4, "atlassian-dev": [0, { "prod": _52 }], "myfritz": _4, "onavstack": _4, "shopselect": _4, "blackbaudcdn": _4, "boomla": _4, "bplaced": _4, "square7": _4, "cdn77": [0, { "r": _4 }], "cdn77-ssl": _4, "gb": _4, "hu": _4, "jp": _4, "se": _4, "uk": _4, "clickrising": _4, "ddns-ip": _4, "dns-cloud": _4, "dns-dynamic": _4, "cloudaccess": _4, "cloudflare": [2, { "cdn": _4 }], "cloudflareanycast": _52, "cloudflarecn": _52, "cloudflareglobal": _52, "ctfcloud": _4, "feste-ip": _4, "knx-server": _4, "static-access": _4, "cryptonomic": _7, "dattolocal": _4, "mydatto": _4, "debian": _4, "definima": _4, "deno": _4, "at-band-camp": _4, "blogdns": _4, "broke-it": _4, "buyshouses": _4, "dnsalias": _4, "dnsdojo": _4, "does-it": _4, "dontexist": _4, "dynalias": _4, "dynathome": _4, "endofinternet": _4, "from-az": _4, "from-co": _4, "from-la": _4, "from-ny": _4, "gets-it": _4, "ham-radio-op": _4, "homeftp": _4, "homeip": _4, "homelinux": _4, "homeunix": _4, "in-the-band": _4, "is-a-chef": _4, "is-a-geek": _4, "isa-geek": _4, "kicks-ass": _4, "office-on-the": _4, "podzone": _4, "scrapper-site": _4, "selfip": _4, "sells-it": _4, "servebbs": _4, "serveftp": _4, "thruhere": _4, "webhop": _4, "casacam": _4, "dynu": _4, "dynv6": _4, "twmail": _4, "ru": _4, "channelsdvr": [2, { "u": _4 }], "fastly": [0, { "freetls": _4, "map": _4, "prod": [0, { "a": _4, "global": _4 }], "ssl": [0, { "a": _4, "b": _4, "global": _4 }] }], "fastlylb": [2, { "map": _4 }], "edgeapp": _4, "keyword-on": _4, "live-on": _4, "server-on": _4, "cdn-edges": _4, "heteml": _4, "cloudfunctions": _4, "grafana-dev": _4, "iobb": _4, "moonscale": _4, "in-dsl": _4, "in-vpn": _4, "oninferno": _4, "botdash": _4, "apps-1and1": _4, "ipifony": _4, "cloudjiffy": [2, { "fra1-de": _4, "west1-us": _4 }], "elastx": [0, { "jls-sto1": _4, "jls-sto2": _4, "jls-sto3": _4 }], "massivegrid": [0, { "paas": [0, { "fr-1": _4, "lon-1": _4, "lon-2": _4, "ny-1": _4, "ny-2": _4, "sg-1": _4 }] }], "saveincloud": [0, { "jelastic": _4, "nordeste-idc": _4 }], "scaleforce": _46, "kinghost": _4, "uni5": _4, "krellian": _4, "ggff": _4, "localcert": _4, "localhostcert": _4, "localto": _7, "barsy": _4, "memset": _4, "azure-api": _4, "azure-mobile": _4, "azureedge": _4, "azurefd": _4, "azurestaticapps": [2, { "1": _4, "2": _4, "3": _4, "4": _4, "5": _4, "6": _4, "7": _4, "centralus": _4, "eastasia": _4, "eastus2": _4, "westeurope": _4, "westus2": _4 }], "azurewebsites": _4, "cloudapp": _4, "trafficmanager": _4, "windows": [0, { "core": [0, { "blob": _4 }], "servicebus": _4 }], "mynetname": [0, { "sn": _4 }], "routingthecloud": _4, "bounceme": _4, "ddns": _4, "eating-organic": _4, "mydissent": _4, "myeffect": _4, "mymediapc": _4, "mypsx": _4, "mysecuritycamera": _4, "nhlfan": _4, "no-ip": _4, "pgafan": _4, "privatizehealthinsurance": _4, "redirectme": _4, "serveblog": _4, "serveminecraft": _4, "sytes": _4, "dnsup": _4, "hicam": _4, "now-dns": _4, "ownip": _4, "vpndns": _4, "cloudycluster": _4, "ovh": [0, { "hosting": _7, "webpaas": _7 }], "rackmaze": _4, "myradweb": _4, "in": _4, "subsc-pay": _4, "squares": _4, "schokokeks": _4, "firewall-gateway": _4, "seidat": _4, "senseering": _4, "siteleaf": _4, "mafelo": _4, "myspreadshop": _4, "vps-host": [2, { "jelastic": [0, { "atl": _4, "njs": _4, "ric": _4 }] }], "srcf": [0, { "soc": _4, "user": _4 }], "supabase": _4, "dsmynas": _4, "familyds": _4, "ts": [2, { "c": _7 }], "torproject": [2, { "pages": _4 }], "vusercontent": _4, "reserve-online": _4, "community-pro": _4, "meinforum": _4, "yandexcloud": [2, { "storage": _4, "website": _4 }], "za": _4 }], "nf": [1, { "arts": _3, "com": _3, "firm": _3, "info": _3, "net": _3, "other": _3, "per": _3, "rec": _3, "store": _3, "web": _3 }], "ng": [1, { "com": _3, "edu": _3, "gov": _3, "i": _3, "mil": _3, "mobi": _3, "name": _3, "net": _3, "org": _3, "sch": _3, "biz": [2, { "co": _4, "dl": _4, "go": _4, "lg": _4, "on": _4 }], "col": _4, "firm": _4, "gen": _4, "ltd": _4, "ngo": _4, "plc": _4 }], "ni": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "gob": _3, "in": _3, "info": _3, "int": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "web": _3 }], "nl": [1, { "co": _4, "hosting-cluster": _4, "gov": _4, "khplay": _4, "123website": _4, "myspreadshop": _4, "transurl": _7, "cistron": _4, "demon": _4 }], "no": [1, { "fhs": _3, "folkebibl": _3, "fylkesbibl": _3, "idrett": _3, "museum": _3, "priv": _3, "vgs": _3, "dep": _3, "herad": _3, "kommune": _3, "mil": _3, "stat": _3, "aa": _60, "ah": _60, "bu": _60, "fm": _60, "hl": _60, "hm": _60, "jan-mayen": _60, "mr": _60, "nl": _60, "nt": _60, "of": _60, "ol": _60, "oslo": _60, "rl": _60, "sf": _60, "st": _60, "svalbard": _60, "tm": _60, "tr": _60, "va": _60, "vf": _60, "akrehamn": _3, "xn--krehamn-dxa": _3, "\xE5krehamn": _3, "algard": _3, "xn--lgrd-poac": _3, "\xE5lg\xE5rd": _3, "arna": _3, "bronnoysund": _3, "xn--brnnysund-m8ac": _3, "br\xF8nn\xF8ysund": _3, "brumunddal": _3, "bryne": _3, "drobak": _3, "xn--drbak-wua": _3, "dr\xF8bak": _3, "egersund": _3, "fetsund": _3, "floro": _3, "xn--flor-jra": _3, "flor\xF8": _3, "fredrikstad": _3, "hokksund": _3, "honefoss": _3, "xn--hnefoss-q1a": _3, "h\xF8nefoss": _3, "jessheim": _3, "jorpeland": _3, "xn--jrpeland-54a": _3, "j\xF8rpeland": _3, "kirkenes": _3, "kopervik": _3, "krokstadelva": _3, "langevag": _3, "xn--langevg-jxa": _3, "langev\xE5g": _3, "leirvik": _3, "mjondalen": _3, "xn--mjndalen-64a": _3, "mj\xF8ndalen": _3, "mo-i-rana": _3, "mosjoen": _3, "xn--mosjen-eya": _3, "mosj\xF8en": _3, "nesoddtangen": _3, "orkanger": _3, "osoyro": _3, "xn--osyro-wua": _3, "os\xF8yro": _3, "raholt": _3, "xn--rholt-mra": _3, "r\xE5holt": _3, "sandnessjoen": _3, "xn--sandnessjen-ogb": _3, "sandnessj\xF8en": _3, "skedsmokorset": _3, "slattum": _3, "spjelkavik": _3, "stathelle": _3, "stavern": _3, "stjordalshalsen": _3, "xn--stjrdalshalsen-sqb": _3, "stj\xF8rdalshalsen": _3, "tananger": _3, "tranby": _3, "vossevangen": _3, "aarborte": _3, "aejrie": _3, "afjord": _3, "xn--fjord-lra": _3, "\xE5fjord": _3, "agdenes": _3, "akershus": _61, "aknoluokta": _3, "xn--koluokta-7ya57h": _3, "\xE1k\u014Boluokta": _3, "al": _3, "xn--l-1fa": _3, "\xE5l": _3, "alaheadju": _3, "xn--laheadju-7ya": _3, "\xE1laheadju": _3, "alesund": _3, "xn--lesund-hua": _3, "\xE5lesund": _3, "alstahaug": _3, "alta": _3, "xn--lt-liac": _3, "\xE1lt\xE1": _3, "alvdal": _3, "amli": _3, "xn--mli-tla": _3, "\xE5mli": _3, "amot": _3, "xn--mot-tla": _3, "\xE5mot": _3, "andasuolo": _3, "andebu": _3, "andoy": _3, "xn--andy-ira": _3, "and\xF8y": _3, "ardal": _3, "xn--rdal-poa": _3, "\xE5rdal": _3, "aremark": _3, "arendal": _3, "xn--s-1fa": _3, "\xE5s": _3, "aseral": _3, "xn--seral-lra": _3, "\xE5seral": _3, "asker": _3, "askim": _3, "askoy": _3, "xn--asky-ira": _3, "ask\xF8y": _3, "askvoll": _3, "asnes": _3, "xn--snes-poa": _3, "\xE5snes": _3, "audnedaln": _3, "aukra": _3, "aure": _3, "aurland": _3, "aurskog-holand": _3, "xn--aurskog-hland-jnb": _3, "aurskog-h\xF8land": _3, "austevoll": _3, "austrheim": _3, "averoy": _3, "xn--avery-yua": _3, "aver\xF8y": _3, "badaddja": _3, "xn--bdddj-mrabd": _3, "b\xE5d\xE5ddj\xE5": _3, "xn--brum-voa": _3, "b\xE6rum": _3, "bahcavuotna": _3, "xn--bhcavuotna-s4a": _3, "b\xE1hcavuotna": _3, "bahccavuotna": _3, "xn--bhccavuotna-k7a": _3, "b\xE1hccavuotna": _3, "baidar": _3, "xn--bidr-5nac": _3, "b\xE1id\xE1r": _3, "bajddar": _3, "xn--bjddar-pta": _3, "b\xE1jddar": _3, "balat": _3, "xn--blt-elab": _3, "b\xE1l\xE1t": _3, "balestrand": _3, "ballangen": _3, "balsfjord": _3, "bamble": _3, "bardu": _3, "barum": _3, "batsfjord": _3, "xn--btsfjord-9za": _3, "b\xE5tsfjord": _3, "bearalvahki": _3, "xn--bearalvhki-y4a": _3, "bearalv\xE1hki": _3, "beardu": _3, "beiarn": _3, "berg": _3, "bergen": _3, "berlevag": _3, "xn--berlevg-jxa": _3, "berlev\xE5g": _3, "bievat": _3, "xn--bievt-0qa": _3, "biev\xE1t": _3, "bindal": _3, "birkenes": _3, "bjarkoy": _3, "xn--bjarky-fya": _3, "bjark\xF8y": _3, "bjerkreim": _3, "bjugn": _3, "bodo": _3, "xn--bod-2na": _3, "bod\xF8": _3, "bokn": _3, "bomlo": _3, "xn--bmlo-gra": _3, "b\xF8mlo": _3, "bremanger": _3, "bronnoy": _3, "xn--brnny-wuac": _3, "br\xF8nn\xF8y": _3, "budejju": _3, "buskerud": _61, "bygland": _3, "bykle": _3, "cahcesuolo": _3, "xn--hcesuolo-7ya35b": _3, "\u010D\xE1hcesuolo": _3, "davvenjarga": _3, "xn--davvenjrga-y4a": _3, "davvenj\xE1rga": _3, "davvesiida": _3, "deatnu": _3, "dielddanuorri": _3, "divtasvuodna": _3, "divttasvuotna": _3, "donna": _3, "xn--dnna-gra": _3, "d\xF8nna": _3, "dovre": _3, "drammen": _3, "drangedal": _3, "dyroy": _3, "xn--dyry-ira": _3, "dyr\xF8y": _3, "eid": _3, "eidfjord": _3, "eidsberg": _3, "eidskog": _3, "eidsvoll": _3, "eigersund": _3, "elverum": _3, "enebakk": _3, "engerdal": _3, "etne": _3, "etnedal": _3, "evenassi": _3, "xn--eveni-0qa01ga": _3, "even\xE1\u0161\u0161i": _3, "evenes": _3, "evje-og-hornnes": _3, "farsund": _3, "fauske": _3, "fedje": _3, "fet": _3, "finnoy": _3, "xn--finny-yua": _3, "finn\xF8y": _3, "fitjar": _3, "fjaler": _3, "fjell": _3, "fla": _3, "xn--fl-zia": _3, "fl\xE5": _3, "flakstad": _3, "flatanger": _3, "flekkefjord": _3, "flesberg": _3, "flora": _3, "folldal": _3, "forde": _3, "xn--frde-gra": _3, "f\xF8rde": _3, "forsand": _3, "fosnes": _3, "xn--frna-woa": _3, "fr\xE6na": _3, "frana": _3, "frei": _3, "frogn": _3, "froland": _3, "frosta": _3, "froya": _3, "xn--frya-hra": _3, "fr\xF8ya": _3, "fuoisku": _3, "fuossko": _3, "fusa": _3, "fyresdal": _3, "gaivuotna": _3, "xn--givuotna-8ya": _3, "g\xE1ivuotna": _3, "galsa": _3, "xn--gls-elac": _3, "g\xE1ls\xE1": _3, "gamvik": _3, "gangaviika": _3, "xn--ggaviika-8ya47h": _3, "g\xE1\u014Bgaviika": _3, "gaular": _3, "gausdal": _3, "giehtavuoatna": _3, "gildeskal": _3, "xn--gildeskl-g0a": _3, "gildesk\xE5l": _3, "giske": _3, "gjemnes": _3, "gjerdrum": _3, "gjerstad": _3, "gjesdal": _3, "gjovik": _3, "xn--gjvik-wua": _3, "gj\xF8vik": _3, "gloppen": _3, "gol": _3, "gran": _3, "grane": _3, "granvin": _3, "gratangen": _3, "grimstad": _3, "grong": _3, "grue": _3, "gulen": _3, "guovdageaidnu": _3, "ha": _3, "xn--h-2fa": _3, "h\xE5": _3, "habmer": _3, "xn--hbmer-xqa": _3, "h\xE1bmer": _3, "hadsel": _3, "xn--hgebostad-g3a": _3, "h\xE6gebostad": _3, "hagebostad": _3, "halden": _3, "halsa": _3, "hamar": _3, "hamaroy": _3, "hammarfeasta": _3, "xn--hmmrfeasta-s4ac": _3, "h\xE1mm\xE1rfeasta": _3, "hammerfest": _3, "hapmir": _3, "xn--hpmir-xqa": _3, "h\xE1pmir": _3, "haram": _3, "hareid": _3, "harstad": _3, "hasvik": _3, "hattfjelldal": _3, "haugesund": _3, "hedmark": [0, { "os": _3, "valer": _3, "xn--vler-qoa": _3, "v\xE5ler": _3 }], "hemne": _3, "hemnes": _3, "hemsedal": _3, "hitra": _3, "hjartdal": _3, "hjelmeland": _3, "hobol": _3, "xn--hobl-ira": _3, "hob\xF8l": _3, "hof": _3, "hol": _3, "hole": _3, "holmestrand": _3, "holtalen": _3, "xn--holtlen-hxa": _3, "holt\xE5len": _3, "hordaland": [0, { "os": _3 }], "hornindal": _3, "horten": _3, "hoyanger": _3, "xn--hyanger-q1a": _3, "h\xF8yanger": _3, "hoylandet": _3, "xn--hylandet-54a": _3, "h\xF8ylandet": _3, "hurdal": _3, "hurum": _3, "hvaler": _3, "hyllestad": _3, "ibestad": _3, "inderoy": _3, "xn--indery-fya": _3, "inder\xF8y": _3, "iveland": _3, "ivgu": _3, "jevnaker": _3, "jolster": _3, "xn--jlster-bya": _3, "j\xF8lster": _3, "jondal": _3, "kafjord": _3, "xn--kfjord-iua": _3, "k\xE5fjord": _3, "karasjohka": _3, "xn--krjohka-hwab49j": _3, "k\xE1r\xE1\u0161johka": _3, "karasjok": _3, "karlsoy": _3, "karmoy": _3, "xn--karmy-yua": _3, "karm\xF8y": _3, "kautokeino": _3, "klabu": _3, "xn--klbu-woa": _3, "kl\xE6bu": _3, "klepp": _3, "kongsberg": _3, "kongsvinger": _3, "kraanghke": _3, "xn--kranghke-b0a": _3, "kr\xE5anghke": _3, "kragero": _3, "xn--krager-gya": _3, "krager\xF8": _3, "kristiansand": _3, "kristiansund": _3, "krodsherad": _3, "xn--krdsherad-m8a": _3, "kr\xF8dsherad": _3, "xn--kvfjord-nxa": _3, "kv\xE6fjord": _3, "xn--kvnangen-k0a": _3, "kv\xE6nangen": _3, "kvafjord": _3, "kvalsund": _3, "kvam": _3, "kvanangen": _3, "kvinesdal": _3, "kvinnherad": _3, "kviteseid": _3, "kvitsoy": _3, "xn--kvitsy-fya": _3, "kvits\xF8y": _3, "laakesvuemie": _3, "xn--lrdal-sra": _3, "l\xE6rdal": _3, "lahppi": _3, "xn--lhppi-xqa": _3, "l\xE1hppi": _3, "lardal": _3, "larvik": _3, "lavagis": _3, "lavangen": _3, "leangaviika": _3, "xn--leagaviika-52b": _3, "lea\u014Bgaviika": _3, "lebesby": _3, "leikanger": _3, "leirfjord": _3, "leka": _3, "leksvik": _3, "lenvik": _3, "lerdal": _3, "lesja": _3, "levanger": _3, "lier": _3, "lierne": _3, "lillehammer": _3, "lillesand": _3, "lindas": _3, "xn--linds-pra": _3, "lind\xE5s": _3, "lindesnes": _3, "loabat": _3, "xn--loabt-0qa": _3, "loab\xE1t": _3, "lodingen": _3, "xn--ldingen-q1a": _3, "l\xF8dingen": _3, "lom": _3, "loppa": _3, "lorenskog": _3, "xn--lrenskog-54a": _3, "l\xF8renskog": _3, "loten": _3, "xn--lten-gra": _3, "l\xF8ten": _3, "lund": _3, "lunner": _3, "luroy": _3, "xn--lury-ira": _3, "lur\xF8y": _3, "luster": _3, "lyngdal": _3, "lyngen": _3, "malatvuopmi": _3, "xn--mlatvuopmi-s4a": _3, "m\xE1latvuopmi": _3, "malselv": _3, "xn--mlselv-iua": _3, "m\xE5lselv": _3, "malvik": _3, "mandal": _3, "marker": _3, "marnardal": _3, "masfjorden": _3, "masoy": _3, "xn--msy-ula0h": _3, "m\xE5s\xF8y": _3, "matta-varjjat": _3, "xn--mtta-vrjjat-k7af": _3, "m\xE1tta-v\xE1rjjat": _3, "meland": _3, "meldal": _3, "melhus": _3, "meloy": _3, "xn--mely-ira": _3, "mel\xF8y": _3, "meraker": _3, "xn--merker-kua": _3, "mer\xE5ker": _3, "midsund": _3, "midtre-gauldal": _3, "moareke": _3, "xn--moreke-jua": _3, "mo\xE5reke": _3, "modalen": _3, "modum": _3, "molde": _3, "more-og-romsdal": [0, { "heroy": _3, "sande": _3 }], "xn--mre-og-romsdal-qqb": [0, { "xn--hery-ira": _3, "sande": _3 }], "m\xF8re-og-romsdal": [0, { "her\xF8y": _3, "sande": _3 }], "moskenes": _3, "moss": _3, "mosvik": _3, "muosat": _3, "xn--muost-0qa": _3, "muos\xE1t": _3, "naamesjevuemie": _3, "xn--nmesjevuemie-tcba": _3, "n\xE5\xE5mesjevuemie": _3, "xn--nry-yla5g": _3, "n\xE6r\xF8y": _3, "namdalseid": _3, "namsos": _3, "namsskogan": _3, "nannestad": _3, "naroy": _3, "narviika": _3, "narvik": _3, "naustdal": _3, "navuotna": _3, "xn--nvuotna-hwa": _3, "n\xE1vuotna": _3, "nedre-eiker": _3, "nesna": _3, "nesodden": _3, "nesseby": _3, "nesset": _3, "nissedal": _3, "nittedal": _3, "nord-aurdal": _3, "nord-fron": _3, "nord-odal": _3, "norddal": _3, "nordkapp": _3, "nordland": [0, { "bo": _3, "xn--b-5ga": _3, "b\xF8": _3, "heroy": _3, "xn--hery-ira": _3, "her\xF8y": _3 }], "nordre-land": _3, "nordreisa": _3, "nore-og-uvdal": _3, "notodden": _3, "notteroy": _3, "xn--nttery-byae": _3, "n\xF8tter\xF8y": _3, "odda": _3, "oksnes": _3, "xn--ksnes-uua": _3, "\xF8ksnes": _3, "omasvuotna": _3, "oppdal": _3, "oppegard": _3, "xn--oppegrd-ixa": _3, "oppeg\xE5rd": _3, "orkdal": _3, "orland": _3, "xn--rland-uua": _3, "\xF8rland": _3, "orskog": _3, "xn--rskog-uua": _3, "\xF8rskog": _3, "orsta": _3, "xn--rsta-fra": _3, "\xF8rsta": _3, "osen": _3, "osteroy": _3, "xn--ostery-fya": _3, "oster\xF8y": _3, "ostfold": [0, { "valer": _3 }], "xn--stfold-9xa": [0, { "xn--vler-qoa": _3 }], "\xF8stfold": [0, { "v\xE5ler": _3 }], "ostre-toten": _3, "xn--stre-toten-zcb": _3, "\xF8stre-toten": _3, "overhalla": _3, "ovre-eiker": _3, "xn--vre-eiker-k8a": _3, "\xF8vre-eiker": _3, "oyer": _3, "xn--yer-zna": _3, "\xF8yer": _3, "oygarden": _3, "xn--ygarden-p1a": _3, "\xF8ygarden": _3, "oystre-slidre": _3, "xn--ystre-slidre-ujb": _3, "\xF8ystre-slidre": _3, "porsanger": _3, "porsangu": _3, "xn--porsgu-sta26f": _3, "pors\xE1\u014Bgu": _3, "porsgrunn": _3, "rade": _3, "xn--rde-ula": _3, "r\xE5de": _3, "radoy": _3, "xn--rady-ira": _3, "rad\xF8y": _3, "xn--rlingen-mxa": _3, "r\xE6lingen": _3, "rahkkeravju": _3, "xn--rhkkervju-01af": _3, "r\xE1hkker\xE1vju": _3, "raisa": _3, "xn--risa-5na": _3, "r\xE1isa": _3, "rakkestad": _3, "ralingen": _3, "rana": _3, "randaberg": _3, "rauma": _3, "rendalen": _3, "rennebu": _3, "rennesoy": _3, "xn--rennesy-v1a": _3, "rennes\xF8y": _3, "rindal": _3, "ringebu": _3, "ringerike": _3, "ringsaker": _3, "risor": _3, "xn--risr-ira": _3, "ris\xF8r": _3, "rissa": _3, "roan": _3, "rodoy": _3, "xn--rdy-0nab": _3, "r\xF8d\xF8y": _3, "rollag": _3, "romsa": _3, "romskog": _3, "xn--rmskog-bya": _3, "r\xF8mskog": _3, "roros": _3, "xn--rros-gra": _3, "r\xF8ros": _3, "rost": _3, "xn--rst-0na": _3, "r\xF8st": _3, "royken": _3, "xn--ryken-vua": _3, "r\xF8yken": _3, "royrvik": _3, "xn--ryrvik-bya": _3, "r\xF8yrvik": _3, "ruovat": _3, "rygge": _3, "salangen": _3, "salat": _3, "xn--slat-5na": _3, "s\xE1lat": _3, "xn--slt-elab": _3, "s\xE1l\xE1t": _3, "saltdal": _3, "samnanger": _3, "sandefjord": _3, "sandnes": _3, "sandoy": _3, "xn--sandy-yua": _3, "sand\xF8y": _3, "sarpsborg": _3, "sauda": _3, "sauherad": _3, "sel": _3, "selbu": _3, "selje": _3, "seljord": _3, "siellak": _3, "sigdal": _3, "siljan": _3, "sirdal": _3, "skanit": _3, "xn--sknit-yqa": _3, "sk\xE1nit": _3, "skanland": _3, "xn--sknland-fxa": _3, "sk\xE5nland": _3, "skaun": _3, "skedsmo": _3, "ski": _3, "skien": _3, "skierva": _3, "xn--skierv-uta": _3, "skierv\xE1": _3, "skiptvet": _3, "skjak": _3, "xn--skjk-soa": _3, "skj\xE5k": _3, "skjervoy": _3, "xn--skjervy-v1a": _3, "skjerv\xF8y": _3, "skodje": _3, "smola": _3, "xn--smla-hra": _3, "sm\xF8la": _3, "snaase": _3, "xn--snase-nra": _3, "sn\xE5ase": _3, "snasa": _3, "xn--snsa-roa": _3, "sn\xE5sa": _3, "snillfjord": _3, "snoasa": _3, "sogndal": _3, "sogne": _3, "xn--sgne-gra": _3, "s\xF8gne": _3, "sokndal": _3, "sola": _3, "solund": _3, "somna": _3, "xn--smna-gra": _3, "s\xF8mna": _3, "sondre-land": _3, "xn--sndre-land-0cb": _3, "s\xF8ndre-land": _3, "songdalen": _3, "sor-aurdal": _3, "xn--sr-aurdal-l8a": _3, "s\xF8r-aurdal": _3, "sor-fron": _3, "xn--sr-fron-q1a": _3, "s\xF8r-fron": _3, "sor-odal": _3, "xn--sr-odal-q1a": _3, "s\xF8r-odal": _3, "sor-varanger": _3, "xn--sr-varanger-ggb": _3, "s\xF8r-varanger": _3, "sorfold": _3, "xn--srfold-bya": _3, "s\xF8rfold": _3, "sorreisa": _3, "xn--srreisa-q1a": _3, "s\xF8rreisa": _3, "sortland": _3, "sorum": _3, "xn--srum-gra": _3, "s\xF8rum": _3, "spydeberg": _3, "stange": _3, "stavanger": _3, "steigen": _3, "steinkjer": _3, "stjordal": _3, "xn--stjrdal-s1a": _3, "stj\xF8rdal": _3, "stokke": _3, "stor-elvdal": _3, "stord": _3, "stordal": _3, "storfjord": _3, "strand": _3, "stranda": _3, "stryn": _3, "sula": _3, "suldal": _3, "sund": _3, "sunndal": _3, "surnadal": _3, "sveio": _3, "svelvik": _3, "sykkylven": _3, "tana": _3, "telemark": [0, { "bo": _3, "xn--b-5ga": _3, "b\xF8": _3 }], "time": _3, "tingvoll": _3, "tinn": _3, "tjeldsund": _3, "tjome": _3, "xn--tjme-hra": _3, "tj\xF8me": _3, "tokke": _3, "tolga": _3, "tonsberg": _3, "xn--tnsberg-q1a": _3, "t\xF8nsberg": _3, "torsken": _3, "xn--trna-woa": _3, "tr\xE6na": _3, "trana": _3, "tranoy": _3, "xn--trany-yua": _3, "tran\xF8y": _3, "troandin": _3, "trogstad": _3, "xn--trgstad-r1a": _3, "tr\xF8gstad": _3, "tromsa": _3, "tromso": _3, "xn--troms-zua": _3, "troms\xF8": _3, "trondheim": _3, "trysil": _3, "tvedestrand": _3, "tydal": _3, "tynset": _3, "tysfjord": _3, "tysnes": _3, "xn--tysvr-vra": _3, "tysv\xE6r": _3, "tysvar": _3, "ullensaker": _3, "ullensvang": _3, "ulvik": _3, "unjarga": _3, "xn--unjrga-rta": _3, "unj\xE1rga": _3, "utsira": _3, "vaapste": _3, "vadso": _3, "xn--vads-jra": _3, "vads\xF8": _3, "xn--vry-yla5g": _3, "v\xE6r\xF8y": _3, "vaga": _3, "xn--vg-yiab": _3, "v\xE5g\xE5": _3, "vagan": _3, "xn--vgan-qoa": _3, "v\xE5gan": _3, "vagsoy": _3, "xn--vgsy-qoa0j": _3, "v\xE5gs\xF8y": _3, "vaksdal": _3, "valle": _3, "vang": _3, "vanylven": _3, "vardo": _3, "xn--vard-jra": _3, "vard\xF8": _3, "varggat": _3, "xn--vrggt-xqad": _3, "v\xE1rgg\xE1t": _3, "varoy": _3, "vefsn": _3, "vega": _3, "vegarshei": _3, "xn--vegrshei-c0a": _3, "veg\xE5rshei": _3, "vennesla": _3, "verdal": _3, "verran": _3, "vestby": _3, "vestfold": [0, { "sande": _3 }], "vestnes": _3, "vestre-slidre": _3, "vestre-toten": _3, "vestvagoy": _3, "xn--vestvgy-ixa6o": _3, "vestv\xE5g\xF8y": _3, "vevelstad": _3, "vik": _3, "vikna": _3, "vindafjord": _3, "voagat": _3, "volda": _3, "voss": _3, "co": _4, "123hjemmeside": _4, "myspreadshop": _4 }], "np": _18, "nr": _56, "nu": [1, { "merseine": _4, "mine": _4, "shacknet": _4, "enterprisecloud": _4 }], "nz": [1, { "ac": _3, "co": _3, "cri": _3, "geek": _3, "gen": _3, "govt": _3, "health": _3, "iwi": _3, "kiwi": _3, "maori": _3, "xn--mori-qsa": _3, "m\u0101ori": _3, "mil": _3, "net": _3, "org": _3, "parliament": _3, "school": _3, "cloudns": _4 }], "om": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "med": _3, "museum": _3, "net": _3, "org": _3, "pro": _3 }], "onion": _3, "org": [1, { "altervista": _4, "pimienta": _4, "poivron": _4, "potager": _4, "sweetpepper": _4, "cdn77": [0, { "c": _4, "rsc": _4 }], "cdn77-secure": [0, { "origin": [0, { "ssl": _4 }] }], "ae": _4, "cloudns": _4, "ip-dynamic": _4, "ddnss": _4, "dpdns": _4, "duckdns": _4, "tunk": _4, "blogdns": _4, "blogsite": _4, "boldlygoingnowhere": _4, "dnsalias": _4, "dnsdojo": _4, "doesntexist": _4, "dontexist": _4, "doomdns": _4, "dvrdns": _4, "dynalias": _4, "dyndns": [2, { "go": _4, "home": _4 }], "endofinternet": _4, "endoftheinternet": _4, "from-me": _4, "game-host": _4, "gotdns": _4, "hobby-site": _4, "homedns": _4, "homeftp": _4, "homelinux": _4, "homeunix": _4, "is-a-bruinsfan": _4, "is-a-candidate": _4, "is-a-celticsfan": _4, "is-a-chef": _4, "is-a-geek": _4, "is-a-knight": _4, "is-a-linux-user": _4, "is-a-patsfan": _4, "is-a-soxfan": _4, "is-found": _4, "is-lost": _4, "is-saved": _4, "is-very-bad": _4, "is-very-evil": _4, "is-very-good": _4, "is-very-nice": _4, "is-very-sweet": _4, "isa-geek": _4, "kicks-ass": _4, "misconfused": _4, "podzone": _4, "readmyblog": _4, "selfip": _4, "sellsyourhome": _4, "servebbs": _4, "serveftp": _4, "servegame": _4, "stuff-4-sale": _4, "webhop": _4, "accesscam": _4, "camdvr": _4, "freeddns": _4, "mywire": _4, "webredirect": _4, "twmail": _4, "eu": [2, { "al": _4, "asso": _4, "at": _4, "au": _4, "be": _4, "bg": _4, "ca": _4, "cd": _4, "ch": _4, "cn": _4, "cy": _4, "cz": _4, "de": _4, "dk": _4, "edu": _4, "ee": _4, "es": _4, "fi": _4, "fr": _4, "gr": _4, "hr": _4, "hu": _4, "ie": _4, "il": _4, "in": _4, "int": _4, "is": _4, "it": _4, "jp": _4, "kr": _4, "lt": _4, "lu": _4, "lv": _4, "me": _4, "mk": _4, "mt": _4, "my": _4, "net": _4, "ng": _4, "nl": _4, "no": _4, "nz": _4, "pl": _4, "pt": _4, "ro": _4, "ru": _4, "se": _4, "si": _4, "sk": _4, "tr": _4, "uk": _4, "us": _4 }], "fedorainfracloud": _4, "fedorapeople": _4, "fedoraproject": [0, { "cloud": _4, "os": _43, "stg": [0, { "os": _43 }] }], "freedesktop": _4, "hatenadiary": _4, "hepforge": _4, "in-dsl": _4, "in-vpn": _4, "js": _4, "barsy": _4, "mayfirst": _4, "routingthecloud": _4, "bmoattachments": _4, "cable-modem": _4, "collegefan": _4, "couchpotatofries": _4, "hopto": _4, "mlbfan": _4, "myftp": _4, "mysecuritycamera": _4, "nflfan": _4, "no-ip": _4, "read-books": _4, "ufcfan": _4, "zapto": _4, "dynserv": _4, "now-dns": _4, "is-local": _4, "httpbin": _4, "pubtls": _4, "jpn": _4, "my-firewall": _4, "myfirewall": _4, "spdns": _4, "small-web": _4, "dsmynas": _4, "familyds": _4, "teckids": _55, "tuxfamily": _4, "diskstation": _4, "hk": _4, "us": _4, "toolforge": _4, "wmcloud": _4, "wmflabs": _4, "za": _4 }], "pa": [1, { "abo": _3, "ac": _3, "com": _3, "edu": _3, "gob": _3, "ing": _3, "med": _3, "net": _3, "nom": _3, "org": _3, "sld": _3 }], "pe": [1, { "com": _3, "edu": _3, "gob": _3, "mil": _3, "net": _3, "nom": _3, "org": _3 }], "pf": [1, { "com": _3, "edu": _3, "org": _3 }], "pg": _18, "ph": [1, { "com": _3, "edu": _3, "gov": _3, "i": _3, "mil": _3, "net": _3, "ngo": _3, "org": _3, "cloudns": _4 }], "pk": [1, { "ac": _3, "biz": _3, "com": _3, "edu": _3, "fam": _3, "gkp": _3, "gob": _3, "gog": _3, "gok": _3, "gop": _3, "gos": _3, "gov": _3, "net": _3, "org": _3, "web": _3 }], "pl": [1, { "com": _3, "net": _3, "org": _3, "agro": _3, "aid": _3, "atm": _3, "auto": _3, "biz": _3, "edu": _3, "gmina": _3, "gsm": _3, "info": _3, "mail": _3, "media": _3, "miasta": _3, "mil": _3, "nieruchomosci": _3, "nom": _3, "pc": _3, "powiat": _3, "priv": _3, "realestate": _3, "rel": _3, "sex": _3, "shop": _3, "sklep": _3, "sos": _3, "szkola": _3, "targi": _3, "tm": _3, "tourism": _3, "travel": _3, "turystyka": _3, "gov": [1, { "ap": _3, "griw": _3, "ic": _3, "is": _3, "kmpsp": _3, "konsulat": _3, "kppsp": _3, "kwp": _3, "kwpsp": _3, "mup": _3, "mw": _3, "oia": _3, "oirm": _3, "oke": _3, "oow": _3, "oschr": _3, "oum": _3, "pa": _3, "pinb": _3, "piw": _3, "po": _3, "pr": _3, "psp": _3, "psse": _3, "pup": _3, "rzgw": _3, "sa": _3, "sdn": _3, "sko": _3, "so": _3, "sr": _3, "starostwo": _3, "ug": _3, "ugim": _3, "um": _3, "umig": _3, "upow": _3, "uppo": _3, "us": _3, "uw": _3, "uzs": _3, "wif": _3, "wiih": _3, "winb": _3, "wios": _3, "witd": _3, "wiw": _3, "wkz": _3, "wsa": _3, "wskr": _3, "wsse": _3, "wuoz": _3, "wzmiuw": _3, "zp": _3, "zpisdn": _3 }], "augustow": _3, "babia-gora": _3, "bedzin": _3, "beskidy": _3, "bialowieza": _3, "bialystok": _3, "bielawa": _3, "bieszczady": _3, "boleslawiec": _3, "bydgoszcz": _3, "bytom": _3, "cieszyn": _3, "czeladz": _3, "czest": _3, "dlugoleka": _3, "elblag": _3, "elk": _3, "glogow": _3, "gniezno": _3, "gorlice": _3, "grajewo": _3, "ilawa": _3, "jaworzno": _3, "jelenia-gora": _3, "jgora": _3, "kalisz": _3, "karpacz": _3, "kartuzy": _3, "kaszuby": _3, "katowice": _3, "kazimierz-dolny": _3, "kepno": _3, "ketrzyn": _3, "klodzko": _3, "kobierzyce": _3, "kolobrzeg": _3, "konin": _3, "konskowola": _3, "kutno": _3, "lapy": _3, "lebork": _3, "legnica": _3, "lezajsk": _3, "limanowa": _3, "lomza": _3, "lowicz": _3, "lubin": _3, "lukow": _3, "malbork": _3, "malopolska": _3, "mazowsze": _3, "mazury": _3, "mielec": _3, "mielno": _3, "mragowo": _3, "naklo": _3, "nowaruda": _3, "nysa": _3, "olawa": _3, "olecko": _3, "olkusz": _3, "olsztyn": _3, "opoczno": _3, "opole": _3, "ostroda": _3, "ostroleka": _3, "ostrowiec": _3, "ostrowwlkp": _3, "pila": _3, "pisz": _3, "podhale": _3, "podlasie": _3, "polkowice": _3, "pomorskie": _3, "pomorze": _3, "prochowice": _3, "pruszkow": _3, "przeworsk": _3, "pulawy": _3, "radom": _3, "rawa-maz": _3, "rybnik": _3, "rzeszow": _3, "sanok": _3, "sejny": _3, "skoczow": _3, "slask": _3, "slupsk": _3, "sosnowiec": _3, "stalowa-wola": _3, "starachowice": _3, "stargard": _3, "suwalki": _3, "swidnica": _3, "swiebodzin": _3, "swinoujscie": _3, "szczecin": _3, "szczytno": _3, "tarnobrzeg": _3, "tgory": _3, "turek": _3, "tychy": _3, "ustka": _3, "walbrzych": _3, "warmia": _3, "warszawa": _3, "waw": _3, "wegrow": _3, "wielun": _3, "wlocl": _3, "wloclawek": _3, "wodzislaw": _3, "wolomin": _3, "wroclaw": _3, "zachpomor": _3, "zagan": _3, "zarow": _3, "zgora": _3, "zgorzelec": _3, "art": _4, "gliwice": _4, "krakow": _4, "poznan": _4, "wroc": _4, "zakopane": _4, "beep": _4, "ecommerce-shop": _4, "cfolks": _4, "dfirma": _4, "dkonto": _4, "you2": _4, "shoparena": _4, "homesklep": _4, "sdscloud": _4, "unicloud": _4, "lodz": _4, "pabianice": _4, "plock": _4, "sieradz": _4, "skierniewice": _4, "zgierz": _4, "krasnik": _4, "leczna": _4, "lubartow": _4, "lublin": _4, "poniatowa": _4, "swidnik": _4, "co": _4, "torun": _4, "simplesite": _4, "myspreadshop": _4, "gda": _4, "gdansk": _4, "gdynia": _4, "med": _4, "sopot": _4, "bielsko": _4 }], "pm": [1, { "own": _4, "name": _4 }], "pn": [1, { "co": _3, "edu": _3, "gov": _3, "net": _3, "org": _3 }], "post": _3, "pr": [1, { "biz": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "isla": _3, "name": _3, "net": _3, "org": _3, "pro": _3, "ac": _3, "est": _3, "prof": _3 }], "pro": [1, { "aaa": _3, "aca": _3, "acct": _3, "avocat": _3, "bar": _3, "cpa": _3, "eng": _3, "jur": _3, "law": _3, "med": _3, "recht": _3, "12chars": _4, "cloudns": _4, "barsy": _4, "ngrok": _4 }], "ps": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "plo": _3, "sec": _3 }], "pt": [1, { "com": _3, "edu": _3, "gov": _3, "int": _3, "net": _3, "nome": _3, "org": _3, "publ": _3, "123paginaweb": _4 }], "pw": [1, { "gov": _3, "cloudns": _4, "x443": _4 }], "py": [1, { "com": _3, "coop": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "qa": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "sch": _3 }], "re": [1, { "asso": _3, "com": _3, "netlib": _4, "can": _4 }], "ro": [1, { "arts": _3, "com": _3, "firm": _3, "info": _3, "nom": _3, "nt": _3, "org": _3, "rec": _3, "store": _3, "tm": _3, "www": _3, "co": _4, "shop": _4, "barsy": _4 }], "rs": [1, { "ac": _3, "co": _3, "edu": _3, "gov": _3, "in": _3, "org": _3, "brendly": _51, "barsy": _4, "ox": _4 }], "ru": [1, { "ac": _4, "edu": _4, "gov": _4, "int": _4, "mil": _4, "eurodir": _4, "adygeya": _4, "bashkiria": _4, "bir": _4, "cbg": _4, "com": _4, "dagestan": _4, "grozny": _4, "kalmykia": _4, "kustanai": _4, "marine": _4, "mordovia": _4, "msk": _4, "mytis": _4, "nalchik": _4, "nov": _4, "pyatigorsk": _4, "spb": _4, "vladikavkaz": _4, "vladimir": _4, "na4u": _4, "mircloud": _4, "myjino": [2, { "hosting": _7, "landing": _7, "spectrum": _7, "vps": _7 }], "cldmail": [0, { "hb": _4 }], "mcdir": [2, { "vps": _4 }], "mcpre": _4, "net": _4, "org": _4, "pp": _4, "lk3": _4, "ras": _4 }], "rw": [1, { "ac": _3, "co": _3, "coop": _3, "gov": _3, "mil": _3, "net": _3, "org": _3 }], "sa": [1, { "com": _3, "edu": _3, "gov": _3, "med": _3, "net": _3, "org": _3, "pub": _3, "sch": _3 }], "sb": _5, "sc": _5, "sd": [1, { "com": _3, "edu": _3, "gov": _3, "info": _3, "med": _3, "net": _3, "org": _3, "tv": _3 }], "se": [1, { "a": _3, "ac": _3, "b": _3, "bd": _3, "brand": _3, "c": _3, "d": _3, "e": _3, "f": _3, "fh": _3, "fhsk": _3, "fhv": _3, "g": _3, "h": _3, "i": _3, "k": _3, "komforb": _3, "kommunalforbund": _3, "komvux": _3, "l": _3, "lanbib": _3, "m": _3, "n": _3, "naturbruksgymn": _3, "o": _3, "org": _3, "p": _3, "parti": _3, "pp": _3, "press": _3, "r": _3, "s": _3, "t": _3, "tm": _3, "u": _3, "w": _3, "x": _3, "y": _3, "z": _3, "com": _4, "iopsys": _4, "123minsida": _4, "itcouldbewor": _4, "myspreadshop": _4 }], "sg": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "enscaled": _4 }], "sh": [1, { "com": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "hashbang": _4, "botda": _4, "platform": [0, { "ent": _4, "eu": _4, "us": _4 }], "now": _4 }], "si": [1, { "f5": _4, "gitapp": _4, "gitpage": _4 }], "sj": _3, "sk": _3, "sl": _5, "sm": _3, "sn": [1, { "art": _3, "com": _3, "edu": _3, "gouv": _3, "org": _3, "perso": _3, "univ": _3 }], "so": [1, { "com": _3, "edu": _3, "gov": _3, "me": _3, "net": _3, "org": _3, "surveys": _4 }], "sr": _3, "ss": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "me": _3, "net": _3, "org": _3, "sch": _3 }], "st": [1, { "co": _3, "com": _3, "consulado": _3, "edu": _3, "embaixada": _3, "mil": _3, "net": _3, "org": _3, "principe": _3, "saotome": _3, "store": _3, "helioho": _4, "kirara": _4, "noho": _4 }], "su": [1, { "abkhazia": _4, "adygeya": _4, "aktyubinsk": _4, "arkhangelsk": _4, "armenia": _4, "ashgabad": _4, "azerbaijan": _4, "balashov": _4, "bashkiria": _4, "bryansk": _4, "bukhara": _4, "chimkent": _4, "dagestan": _4, "east-kazakhstan": _4, "exnet": _4, "georgia": _4, "grozny": _4, "ivanovo": _4, "jambyl": _4, "kalmykia": _4, "kaluga": _4, "karacol": _4, "karaganda": _4, "karelia": _4, "khakassia": _4, "krasnodar": _4, "kurgan": _4, "kustanai": _4, "lenug": _4, "mangyshlak": _4, "mordovia": _4, "msk": _4, "murmansk": _4, "nalchik": _4, "navoi": _4, "north-kazakhstan": _4, "nov": _4, "obninsk": _4, "penza": _4, "pokrovsk": _4, "sochi": _4, "spb": _4, "tashkent": _4, "termez": _4, "togliatti": _4, "troitsk": _4, "tselinograd": _4, "tula": _4, "tuva": _4, "vladikavkaz": _4, "vladimir": _4, "vologda": _4 }], "sv": [1, { "com": _3, "edu": _3, "gob": _3, "org": _3, "red": _3 }], "sx": _11, "sy": _6, "sz": [1, { "ac": _3, "co": _3, "org": _3 }], "tc": _3, "td": _3, "tel": _3, "tf": [1, { "sch": _4 }], "tg": _3, "th": [1, { "ac": _3, "co": _3, "go": _3, "in": _3, "mi": _3, "net": _3, "or": _3, "online": _4, "shop": _4 }], "tj": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "go": _3, "gov": _3, "int": _3, "mil": _3, "name": _3, "net": _3, "nic": _3, "org": _3, "test": _3, "web": _3 }], "tk": _3, "tl": _11, "tm": [1, { "co": _3, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "nom": _3, "org": _3 }], "tn": [1, { "com": _3, "ens": _3, "fin": _3, "gov": _3, "ind": _3, "info": _3, "intl": _3, "mincom": _3, "nat": _3, "net": _3, "org": _3, "perso": _3, "tourism": _3, "orangecloud": _4 }], "to": [1, { "611": _4, "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "oya": _4, "x0": _4, "quickconnect": _25, "vpnplus": _4 }], "tr": [1, { "av": _3, "bbs": _3, "bel": _3, "biz": _3, "com": _3, "dr": _3, "edu": _3, "gen": _3, "gov": _3, "info": _3, "k12": _3, "kep": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pol": _3, "tel": _3, "tsk": _3, "tv": _3, "web": _3, "nc": _11 }], "tt": [1, { "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "mil": _3, "name": _3, "net": _3, "org": _3, "pro": _3 }], "tv": [1, { "better-than": _4, "dyndns": _4, "on-the-web": _4, "worse-than": _4, "from": _4, "sakura": _4 }], "tw": [1, { "club": _3, "com": [1, { "mymailer": _4 }], "ebiz": _3, "edu": _3, "game": _3, "gov": _3, "idv": _3, "mil": _3, "net": _3, "org": _3, "url": _4, "mydns": _4 }], "tz": [1, { "ac": _3, "co": _3, "go": _3, "hotel": _3, "info": _3, "me": _3, "mil": _3, "mobi": _3, "ne": _3, "or": _3, "sc": _3, "tv": _3 }], "ua": [1, { "com": _3, "edu": _3, "gov": _3, "in": _3, "net": _3, "org": _3, "cherkassy": _3, "cherkasy": _3, "chernigov": _3, "chernihiv": _3, "chernivtsi": _3, "chernovtsy": _3, "ck": _3, "cn": _3, "cr": _3, "crimea": _3, "cv": _3, "dn": _3, "dnepropetrovsk": _3, "dnipropetrovsk": _3, "donetsk": _3, "dp": _3, "if": _3, "ivano-frankivsk": _3, "kh": _3, "kharkiv": _3, "kharkov": _3, "kherson": _3, "khmelnitskiy": _3, "khmelnytskyi": _3, "kiev": _3, "kirovograd": _3, "km": _3, "kr": _3, "kropyvnytskyi": _3, "krym": _3, "ks": _3, "kv": _3, "kyiv": _3, "lg": _3, "lt": _3, "lugansk": _3, "luhansk": _3, "lutsk": _3, "lv": _3, "lviv": _3, "mk": _3, "mykolaiv": _3, "nikolaev": _3, "od": _3, "odesa": _3, "odessa": _3, "pl": _3, "poltava": _3, "rivne": _3, "rovno": _3, "rv": _3, "sb": _3, "sebastopol": _3, "sevastopol": _3, "sm": _3, "sumy": _3, "te": _3, "ternopil": _3, "uz": _3, "uzhgorod": _3, "uzhhorod": _3, "vinnica": _3, "vinnytsia": _3, "vn": _3, "volyn": _3, "yalta": _3, "zakarpattia": _3, "zaporizhzhe": _3, "zaporizhzhia": _3, "zhitomir": _3, "zhytomyr": _3, "zp": _3, "zt": _3, "cc": _4, "inf": _4, "ltd": _4, "cx": _4, "ie": _4, "biz": _4, "co": _4, "pp": _4, "v": _4 }], "ug": [1, { "ac": _3, "co": _3, "com": _3, "edu": _3, "go": _3, "gov": _3, "mil": _3, "ne": _3, "or": _3, "org": _3, "sc": _3, "us": _3 }], "uk": [1, { "ac": _3, "co": [1, { "bytemark": [0, { "dh": _4, "vm": _4 }], "layershift": _46, "barsy": _4, "barsyonline": _4, "retrosnub": _54, "nh-serv": _4, "no-ip": _4, "adimo": _4, "myspreadshop": _4 }], "gov": [1, { "api": _4, "campaign": _4, "service": _4 }], "ltd": _3, "me": _3, "net": _3, "nhs": _3, "org": [1, { "glug": _4, "lug": _4, "lugs": _4, "affinitylottery": _4, "raffleentry": _4, "weeklylottery": _4 }], "plc": _3, "police": _3, "sch": _18, "conn": _4, "copro": _4, "hosp": _4, "independent-commission": _4, "independent-inquest": _4, "independent-inquiry": _4, "independent-panel": _4, "independent-review": _4, "public-inquiry": _4, "royal-commission": _4, "pymnt": _4, "barsy": _4, "nimsite": _4, "oraclegovcloudapps": _7 }], "us": [1, { "dni": _3, "isa": _3, "nsn": _3, "ak": _62, "al": _62, "ar": _62, "as": _62, "az": _62, "ca": _62, "co": _62, "ct": _62, "dc": _62, "de": [1, { "cc": _3, "lib": _4 }], "fl": _62, "ga": _62, "gu": _62, "hi": _63, "ia": _62, "id": _62, "il": _62, "in": _62, "ks": _62, "ky": _62, "la": _62, "ma": [1, { "k12": [1, { "chtr": _3, "paroch": _3, "pvt": _3 }], "cc": _3, "lib": _3 }], "md": _62, "me": _62, "mi": [1, { "k12": _3, "cc": _3, "lib": _3, "ann-arbor": _3, "cog": _3, "dst": _3, "eaton": _3, "gen": _3, "mus": _3, "tec": _3, "washtenaw": _3 }], "mn": _62, "mo": _62, "ms": _62, "mt": _62, "nc": _62, "nd": _63, "ne": _62, "nh": _62, "nj": _62, "nm": _62, "nv": _62, "ny": _62, "oh": _62, "ok": _62, "or": _62, "pa": _62, "pr": _62, "ri": _63, "sc": _62, "sd": _63, "tn": _62, "tx": _62, "ut": _62, "va": _62, "vi": _62, "vt": _62, "wa": _62, "wi": _62, "wv": [1, { "cc": _3 }], "wy": _62, "cloudns": _4, "is-by": _4, "land-4-sale": _4, "stuff-4-sale": _4, "heliohost": _4, "enscaled": [0, { "phx": _4 }], "mircloud": _4, "ngo": _4, "golffan": _4, "noip": _4, "pointto": _4, "freeddns": _4, "srv": [2, { "gh": _4, "gl": _4 }], "platterp": _4, "servername": _4 }], "uy": [1, { "com": _3, "edu": _3, "gub": _3, "mil": _3, "net": _3, "org": _3 }], "uz": [1, { "co": _3, "com": _3, "net": _3, "org": _3 }], "va": _3, "vc": [1, { "com": _3, "edu": _3, "gov": _3, "mil": _3, "net": _3, "org": _3, "gv": [2, { "d": _4 }], "0e": _7, "mydns": _4 }], "ve": [1, { "arts": _3, "bib": _3, "co": _3, "com": _3, "e12": _3, "edu": _3, "emprende": _3, "firm": _3, "gob": _3, "gov": _3, "info": _3, "int": _3, "mil": _3, "net": _3, "nom": _3, "org": _3, "rar": _3, "rec": _3, "store": _3, "tec": _3, "web": _3 }], "vg": [1, { "edu": _3 }], "vi": [1, { "co": _3, "com": _3, "k12": _3, "net": _3, "org": _3 }], "vn": [1, { "ac": _3, "ai": _3, "biz": _3, "com": _3, "edu": _3, "gov": _3, "health": _3, "id": _3, "info": _3, "int": _3, "io": _3, "name": _3, "net": _3, "org": _3, "pro": _3, "angiang": _3, "bacgiang": _3, "backan": _3, "baclieu": _3, "bacninh": _3, "baria-vungtau": _3, "bentre": _3, "binhdinh": _3, "binhduong": _3, "binhphuoc": _3, "binhthuan": _3, "camau": _3, "cantho": _3, "caobang": _3, "daklak": _3, "daknong": _3, "danang": _3, "dienbien": _3, "dongnai": _3, "dongthap": _3, "gialai": _3, "hagiang": _3, "haiduong": _3, "haiphong": _3, "hanam": _3, "hanoi": _3, "hatinh": _3, "haugiang": _3, "hoabinh": _3, "hungyen": _3, "khanhhoa": _3, "kiengiang": _3, "kontum": _3, "laichau": _3, "lamdong": _3, "langson": _3, "laocai": _3, "longan": _3, "namdinh": _3, "nghean": _3, "ninhbinh": _3, "ninhthuan": _3, "phutho": _3, "phuyen": _3, "quangbinh": _3, "quangnam": _3, "quangngai": _3, "quangninh": _3, "quangtri": _3, "soctrang": _3, "sonla": _3, "tayninh": _3, "thaibinh": _3, "thainguyen": _3, "thanhhoa": _3, "thanhphohochiminh": _3, "thuathienhue": _3, "tiengiang": _3, "travinh": _3, "tuyenquang": _3, "vinhlong": _3, "vinhphuc": _3, "yenbai": _3 }], "vu": _45, "wf": [1, { "biz": _4, "sch": _4 }], "ws": [1, { "com": _3, "edu": _3, "gov": _3, "net": _3, "org": _3, "advisor": _7, "cloud66": _4, "dyndns": _4, "mypets": _4 }], "yt": [1, { "org": _4 }], "xn--mgbaam7a8h": _3, "\u0627\u0645\u0627\u0631\u0627\u062A": _3, "xn--y9a3aq": _3, "\u0570\u0561\u0575": _3, "xn--54b7fta0cc": _3, "\u09AC\u09BE\u0982\u09B2\u09BE": _3, "xn--90ae": _3, "\u0431\u0433": _3, "xn--mgbcpq6gpa1a": _3, "\u0627\u0644\u0628\u062D\u0631\u064A\u0646": _3, "xn--90ais": _3, "\u0431\u0435\u043B": _3, "xn--fiqs8s": _3, "\u4E2D\u56FD": _3, "xn--fiqz9s": _3, "\u4E2D\u570B": _3, "xn--lgbbat1ad8j": _3, "\u0627\u0644\u062C\u0632\u0627\u0626\u0631": _3, "xn--wgbh1c": _3, "\u0645\u0635\u0631": _3, "xn--e1a4c": _3, "\u0435\u044E": _3, "xn--qxa6a": _3, "\u03B5\u03C5": _3, "xn--mgbah1a3hjkrd": _3, "\u0645\u0648\u0631\u064A\u062A\u0627\u0646\u064A\u0627": _3, "xn--node": _3, "\u10D2\u10D4": _3, "xn--qxam": _3, "\u03B5\u03BB": _3, "xn--j6w193g": [1, { "xn--gmqw5a": _3, "xn--55qx5d": _3, "xn--mxtq1m": _3, "xn--wcvs22d": _3, "xn--uc0atv": _3, "xn--od0alg": _3 }], "\u9999\u6E2F": [1, { "\u500B\u4EBA": _3, "\u516C\u53F8": _3, "\u653F\u5E9C": _3, "\u6559\u80B2": _3, "\u7D44\u7E54": _3, "\u7DB2\u7D61": _3 }], "xn--2scrj9c": _3, "\u0CAD\u0CBE\u0CB0\u0CA4": _3, "xn--3hcrj9c": _3, "\u0B2D\u0B3E\u0B30\u0B24": _3, "xn--45br5cyl": _3, "\u09AD\u09BE\u09F0\u09A4": _3, "xn--h2breg3eve": _3, "\u092D\u093E\u0930\u0924\u092E\u094D": _3, "xn--h2brj9c8c": _3, "\u092D\u093E\u0930\u094B\u0924": _3, "xn--mgbgu82a": _3, "\u0680\u0627\u0631\u062A": _3, "xn--rvc1e0am3e": _3, "\u0D2D\u0D3E\u0D30\u0D24\u0D02": _3, "xn--h2brj9c": _3, "\u092D\u093E\u0930\u0924": _3, "xn--mgbbh1a": _3, "\u0628\u0627\u0631\u062A": _3, "xn--mgbbh1a71e": _3, "\u0628\u06BE\u0627\u0631\u062A": _3, "xn--fpcrj9c3d": _3, "\u0C2D\u0C3E\u0C30\u0C24\u0C4D": _3, "xn--gecrj9c": _3, "\u0AAD\u0ABE\u0AB0\u0AA4": _3, "xn--s9brj9c": _3, "\u0A2D\u0A3E\u0A30\u0A24": _3, "xn--45brj9c": _3, "\u09AD\u09BE\u09B0\u09A4": _3, "xn--xkc2dl3a5ee0h": _3, "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE": _3, "xn--mgba3a4f16a": _3, "\u0627\u06CC\u0631\u0627\u0646": _3, "xn--mgba3a4fra": _3, "\u0627\u064A\u0631\u0627\u0646": _3, "xn--mgbtx2b": _3, "\u0639\u0631\u0627\u0642": _3, "xn--mgbayh7gpa": _3, "\u0627\u0644\u0627\u0631\u062F\u0646": _3, "xn--3e0b707e": _3, "\uD55C\uAD6D": _3, "xn--80ao21a": _3, "\u049B\u0430\u0437": _3, "xn--q7ce6a": _3, "\u0EA5\u0EB2\u0EA7": _3, "xn--fzc2c9e2c": _3, "\u0DBD\u0D82\u0D9A\u0DCF": _3, "xn--xkc2al3hye2a": _3, "\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8": _3, "xn--mgbc0a9azcg": _3, "\u0627\u0644\u0645\u063A\u0631\u0628": _3, "xn--d1alf": _3, "\u043C\u043A\u0434": _3, "xn--l1acc": _3, "\u043C\u043E\u043D": _3, "xn--mix891f": _3, "\u6FB3\u9580": _3, "xn--mix082f": _3, "\u6FB3\u95E8": _3, "xn--mgbx4cd0ab": _3, "\u0645\u0644\u064A\u0633\u064A\u0627": _3, "xn--mgb9awbf": _3, "\u0639\u0645\u0627\u0646": _3, "xn--mgbai9azgqp6j": _3, "\u067E\u0627\u06A9\u0633\u062A\u0627\u0646": _3, "xn--mgbai9a5eva00b": _3, "\u067E\u0627\u0643\u0633\u062A\u0627\u0646": _3, "xn--ygbi2ammx": _3, "\u0641\u0644\u0633\u0637\u064A\u0646": _3, "xn--90a3ac": [1, { "xn--80au": _3, "xn--90azh": _3, "xn--d1at": _3, "xn--c1avg": _3, "xn--o1ac": _3, "xn--o1ach": _3 }], "\u0441\u0440\u0431": [1, { "\u0430\u043A": _3, "\u043E\u0431\u0440": _3, "\u043E\u0434": _3, "\u043E\u0440\u0433": _3, "\u043F\u0440": _3, "\u0443\u043F\u0440": _3 }], "xn--p1ai": _3, "\u0440\u0444": _3, "xn--wgbl6a": _3, "\u0642\u0637\u0631": _3, "xn--mgberp4a5d4ar": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629": _3, "xn--mgberp4a5d4a87g": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u0629": _3, "xn--mgbqly7c0a67fbc": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u06CC\u06C3": _3, "xn--mgbqly7cvafr": _3, "\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0647": _3, "xn--mgbpl2fh": _3, "\u0633\u0648\u062F\u0627\u0646": _3, "xn--yfro4i67o": _3, "\u65B0\u52A0\u5761": _3, "xn--clchc0ea0b2g2a9gcd": _3, "\u0B9A\u0BBF\u0B99\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0BC2\u0BB0\u0BCD": _3, "xn--ogbpf8fl": _3, "\u0633\u0648\u0631\u064A\u0629": _3, "xn--mgbtf8fl": _3, "\u0633\u0648\u0631\u064A\u0627": _3, "xn--o3cw4h": [1, { "xn--o3cyx2a": _3, "xn--12co0c3b4eva": _3, "xn--m3ch0j3a": _3, "xn--h3cuzk1di": _3, "xn--12c1fe0br": _3, "xn--12cfi8ixb8l": _3 }], "\u0E44\u0E17\u0E22": [1, { "\u0E17\u0E2B\u0E32\u0E23": _3, "\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08": _3, "\u0E40\u0E19\u0E47\u0E15": _3, "\u0E23\u0E31\u0E10\u0E1A\u0E32\u0E25": _3, "\u0E28\u0E36\u0E01\u0E29\u0E32": _3, "\u0E2D\u0E07\u0E04\u0E4C\u0E01\u0E23": _3 }], "xn--pgbs0dh": _3, "\u062A\u0648\u0646\u0633": _3, "xn--kpry57d": _3, "\u53F0\u7063": _3, "xn--kprw13d": _3, "\u53F0\u6E7E": _3, "xn--nnx388a": _3, "\u81FA\u7063": _3, "xn--j1amh": _3, "\u0443\u043A\u0440": _3, "xn--mgb2ddes": _3, "\u0627\u0644\u064A\u0645\u0646": _3, "xxx": _3, "ye": _6, "za": [0, { "ac": _3, "agric": _3, "alt": _3, "co": _3, "edu": _3, "gov": _3, "grondar": _3, "law": _3, "mil": _3, "net": _3, "ngo": _3, "nic": _3, "nis": _3, "nom": _3, "org": _3, "school": _3, "tm": _3, "web": _3 }], "zm": [1, { "ac": _3, "biz": _3, "co": _3, "com": _3, "edu": _3, "gov": _3, "info": _3, "mil": _3, "net": _3, "org": _3, "sch": _3 }], "zw": [1, { "ac": _3, "co": _3, "gov": _3, "mil": _3, "org": _3 }], "aaa": _3, "aarp": _3, "abb": _3, "abbott": _3, "abbvie": _3, "abc": _3, "able": _3, "abogado": _3, "abudhabi": _3, "academy": [1, { "official": _4 }], "accenture": _3, "accountant": _3, "accountants": _3, "aco": _3, "actor": _3, "ads": _3, "adult": _3, "aeg": _3, "aetna": _3, "afl": _3, "africa": _3, "agakhan": _3, "agency": _3, "aig": _3, "airbus": _3, "airforce": _3, "airtel": _3, "akdn": _3, "alibaba": _3, "alipay": _3, "allfinanz": _3, "allstate": _3, "ally": _3, "alsace": _3, "alstom": _3, "amazon": _3, "americanexpress": _3, "americanfamily": _3, "amex": _3, "amfam": _3, "amica": _3, "amsterdam": _3, "analytics": _3, "android": _3, "anquan": _3, "anz": _3, "aol": _3, "apartments": _3, "app": [1, { "adaptable": _4, "aiven": _4, "beget": _7, "brave": _8, "clerk": _4, "clerkstage": _4, "wnext": _4, "csb": [2, { "preview": _4 }], "convex": _4, "deta": _4, "ondigitalocean": _4, "easypanel": _4, "encr": _4, "evervault": _9, "expo": [2, { "staging": _4 }], "edgecompute": _4, "on-fleek": _4, "flutterflow": _4, "e2b": _4, "framer": _4, "hosted": _7, "run": _7, "web": _4, "hasura": _4, "botdash": _4, "loginline": _4, "lovable": _4, "medusajs": _4, "messerli": _4, "netfy": _4, "netlify": _4, "ngrok": _4, "ngrok-free": _4, "developer": _7, "noop": _4, "northflank": _7, "upsun": _7, "replit": _10, "nyat": _4, "snowflake": [0, { "*": _4, "privatelink": _7 }], "streamlit": _4, "storipress": _4, "telebit": _4, "typedream": _4, "vercel": _4, "bookonline": _4, "wdh": _4, "windsurf": _4, "zeabur": _4, "zerops": _7 }], "apple": _3, "aquarelle": _3, "arab": _3, "aramco": _3, "archi": _3, "army": _3, "art": _3, "arte": _3, "asda": _3, "associates": _3, "athleta": _3, "attorney": _3, "auction": _3, "audi": _3, "audible": _3, "audio": _3, "auspost": _3, "author": _3, "auto": _3, "autos": _3, "aws": [1, { "sagemaker": [0, { "ap-northeast-1": _14, "ap-northeast-2": _14, "ap-south-1": _14, "ap-southeast-1": _14, "ap-southeast-2": _14, "ca-central-1": _16, "eu-central-1": _14, "eu-west-1": _14, "eu-west-2": _14, "us-east-1": _16, "us-east-2": _16, "us-west-2": _16, "af-south-1": _13, "ap-east-1": _13, "ap-northeast-3": _13, "ap-south-2": _15, "ap-southeast-3": _13, "ap-southeast-4": _15, "ca-west-1": [0, { "notebook": _4, "notebook-fips": _4 }], "eu-central-2": _13, "eu-north-1": _13, "eu-south-1": _13, "eu-south-2": _13, "eu-west-3": _13, "il-central-1": _13, "me-central-1": _13, "me-south-1": _13, "sa-east-1": _13, "us-gov-east-1": _17, "us-gov-west-1": _17, "us-west-1": [0, { "notebook": _4, "notebook-fips": _4, "studio": _4 }], "experiments": _7 }], "repost": [0, { "private": _7 }], "on": [0, { "ap-northeast-1": _12, "ap-southeast-1": _12, "ap-southeast-2": _12, "eu-central-1": _12, "eu-north-1": _12, "eu-west-1": _12, "us-east-1": _12, "us-east-2": _12, "us-west-2": _12 }] }], "axa": _3, "azure": _3, "baby": _3, "baidu": _3, "banamex": _3, "band": _3, "bank": _3, "bar": _3, "barcelona": _3, "barclaycard": _3, "barclays": _3, "barefoot": _3, "bargains": _3, "baseball": _3, "basketball": [1, { "aus": _4, "nz": _4 }], "bauhaus": _3, "bayern": _3, "bbc": _3, "bbt": _3, "bbva": _3, "bcg": _3, "bcn": _3, "beats": _3, "beauty": _3, "beer": _3, "bentley": _3, "berlin": _3, "best": _3, "bestbuy": _3, "bet": _3, "bharti": _3, "bible": _3, "bid": _3, "bike": _3, "bing": _3, "bingo": _3, "bio": _3, "black": _3, "blackfriday": _3, "blockbuster": _3, "blog": _3, "bloomberg": _3, "blue": _3, "bms": _3, "bmw": _3, "bnpparibas": _3, "boats": _3, "boehringer": _3, "bofa": _3, "bom": _3, "bond": _3, "boo": _3, "book": _3, "booking": _3, "bosch": _3, "bostik": _3, "boston": _3, "bot": _3, "boutique": _3, "box": _3, "bradesco": _3, "bridgestone": _3, "broadway": _3, "broker": _3, "brother": _3, "brussels": _3, "build": [1, { "v0": _4, "windsurf": _4 }], "builders": [1, { "cloudsite": _4 }], "business": _19, "buy": _3, "buzz": _3, "bzh": _3, "cab": _3, "cafe": _3, "cal": _3, "call": _3, "calvinklein": _3, "cam": _3, "camera": _3, "camp": [1, { "emf": [0, { "at": _4 }] }], "canon": _3, "capetown": _3, "capital": _3, "capitalone": _3, "car": _3, "caravan": _3, "cards": _3, "care": _3, "career": _3, "careers": _3, "cars": _3, "casa": [1, { "nabu": [0, { "ui": _4 }] }], "case": _3, "cash": _3, "casino": _3, "catering": _3, "catholic": _3, "cba": _3, "cbn": _3, "cbre": _3, "center": _3, "ceo": _3, "cern": _3, "cfa": _3, "cfd": _3, "chanel": _3, "channel": _3, "charity": _3, "chase": _3, "chat": _3, "cheap": _3, "chintai": _3, "christmas": _3, "chrome": _3, "church": _3, "cipriani": _3, "circle": _3, "cisco": _3, "citadel": _3, "citi": _3, "citic": _3, "city": _3, "claims": _3, "cleaning": _3, "click": _3, "clinic": _3, "clinique": _3, "clothing": _3, "cloud": [1, { "convex": _4, "elementor": _4, "encoway": [0, { "eu": _4 }], "statics": _7, "ravendb": _4, "axarnet": [0, { "es-1": _4 }], "diadem": _4, "jelastic": [0, { "vip": _4 }], "jele": _4, "jenv-aruba": [0, { "aruba": [0, { "eur": [0, { "it1": _4 }] }], "it1": _4 }], "keliweb": [2, { "cs": _4 }], "oxa": [2, { "tn": _4, "uk": _4 }], "primetel": [2, { "uk": _4 }], "reclaim": [0, { "ca": _4, "uk": _4, "us": _4 }], "trendhosting": [0, { "ch": _4, "de": _4 }], "jotelulu": _4, "kuleuven": _4, "laravel": _4, "linkyard": _4, "magentosite": _7, "matlab": _4, "observablehq": _4, "perspecta": _4, "vapor": _4, "on-rancher": _7, "scw": [0, { "baremetal": [0, { "fr-par-1": _4, "fr-par-2": _4, "nl-ams-1": _4 }], "fr-par": [0, { "cockpit": _4, "fnc": [2, { "functions": _4 }], "k8s": _21, "s3": _4, "s3-website": _4, "whm": _4 }], "instances": [0, { "priv": _4, "pub": _4 }], "k8s": _4, "nl-ams": [0, { "cockpit": _4, "k8s": _21, "s3": _4, "s3-website": _4, "whm": _4 }], "pl-waw": [0, { "cockpit": _4, "k8s": _21, "s3": _4, "s3-website": _4 }], "scalebook": _4, "smartlabeling": _4 }], "servebolt": _4, "onstackit": [0, { "runs": _4 }], "trafficplex": _4, "unison-services": _4, "urown": _4, "voorloper": _4, "zap": _4 }], "club": [1, { "cloudns": _4, "jele": _4, "barsy": _4 }], "clubmed": _3, "coach": _3, "codes": [1, { "owo": _7 }], "coffee": _3, "college": _3, "cologne": _3, "commbank": _3, "community": [1, { "nog": _4, "ravendb": _4, "myforum": _4 }], "company": _3, "compare": _3, "computer": _3, "comsec": _3, "condos": _3, "construction": _3, "consulting": _3, "contact": _3, "contractors": _3, "cooking": _3, "cool": [1, { "elementor": _4, "de": _4 }], "corsica": _3, "country": _3, "coupon": _3, "coupons": _3, "courses": _3, "cpa": _3, "credit": _3, "creditcard": _3, "creditunion": _3, "cricket": _3, "crown": _3, "crs": _3, "cruise": _3, "cruises": _3, "cuisinella": _3, "cymru": _3, "cyou": _3, "dad": _3, "dance": _3, "data": _3, "date": _3, "dating": _3, "datsun": _3, "day": _3, "dclk": _3, "dds": _3, "deal": _3, "dealer": _3, "deals": _3, "degree": _3, "delivery": _3, "dell": _3, "deloitte": _3, "delta": _3, "democrat": _3, "dental": _3, "dentist": _3, "desi": _3, "design": [1, { "graphic": _4, "bss": _4 }], "dev": [1, { "12chars": _4, "myaddr": _4, "panel": _4, "lcl": _7, "lclstage": _7, "stg": _7, "stgstage": _7, "pages": _4, "r2": _4, "workers": _4, "deno": _4, "deno-staging": _4, "deta": _4, "evervault": _9, "fly": _4, "githubpreview": _4, "gateway": _7, "hrsn": [2, { "psl": [0, { "sub": _4, "wc": [0, { "*": _4, "sub": _7 }] }] }], "botdash": _4, "inbrowser": _7, "is-a-good": _4, "is-a": _4, "iserv": _4, "runcontainers": _4, "localcert": [0, { "user": _7 }], "loginline": _4, "barsy": _4, "mediatech": _4, "modx": _4, "ngrok": _4, "ngrok-free": _4, "is-a-fullstack": _4, "is-cool": _4, "is-not-a": _4, "localplayer": _4, "xmit": _4, "platter-app": _4, "replit": [2, { "archer": _4, "bones": _4, "canary": _4, "global": _4, "hacker": _4, "id": _4, "janeway": _4, "kim": _4, "kira": _4, "kirk": _4, "odo": _4, "paris": _4, "picard": _4, "pike": _4, "prerelease": _4, "reed": _4, "riker": _4, "sisko": _4, "spock": _4, "staging": _4, "sulu": _4, "tarpit": _4, "teams": _4, "tucker": _4, "wesley": _4, "worf": _4 }], "crm": [0, { "d": _7, "w": _7, "wa": _7, "wb": _7, "wc": _7, "wd": _7, "we": _7, "wf": _7 }], "vercel": _4, "webhare": _7 }], "dhl": _3, "diamonds": _3, "diet": _3, "digital": [1, { "cloudapps": [2, { "london": _4 }] }], "direct": [1, { "libp2p": _4 }], "directory": _3, "discount": _3, "discover": _3, "dish": _3, "diy": _3, "dnp": _3, "docs": _3, "doctor": _3, "dog": _3, "domains": _3, "dot": _3, "download": _3, "drive": _3, "dtv": _3, "dubai": _3, "dunlop": _3, "dupont": _3, "durban": _3, "dvag": _3, "dvr": _3, "earth": _3, "eat": _3, "eco": _3, "edeka": _3, "education": _19, "email": [1, { "crisp": [0, { "on": _4 }], "tawk": _49, "tawkto": _49 }], "emerck": _3, "energy": _3, "engineer": _3, "engineering": _3, "enterprises": _3, "epson": _3, "equipment": _3, "ericsson": _3, "erni": _3, "esq": _3, "estate": [1, { "compute": _7 }], "eurovision": _3, "eus": [1, { "party": _50 }], "events": [1, { "koobin": _4, "co": _4 }], "exchange": _3, "expert": _3, "exposed": _3, "express": _3, "extraspace": _3, "fage": _3, "fail": _3, "fairwinds": _3, "faith": _3, "family": _3, "fan": _3, "fans": _3, "farm": [1, { "storj": _4 }], "farmers": _3, "fashion": _3, "fast": _3, "fedex": _3, "feedback": _3, "ferrari": _3, "ferrero": _3, "fidelity": _3, "fido": _3, "film": _3, "final": _3, "finance": _3, "financial": _19, "fire": _3, "firestone": _3, "firmdale": _3, "fish": _3, "fishing": _3, "fit": _3, "fitness": _3, "flickr": _3, "flights": _3, "flir": _3, "florist": _3, "flowers": _3, "fly": _3, "foo": _3, "food": _3, "football": _3, "ford": _3, "forex": _3, "forsale": _3, "forum": _3, "foundation": _3, "fox": _3, "free": _3, "fresenius": _3, "frl": _3, "frogans": _3, "frontier": _3, "ftr": _3, "fujitsu": _3, "fun": _3, "fund": _3, "furniture": _3, "futbol": _3, "fyi": _3, "gal": _3, "gallery": _3, "gallo": _3, "gallup": _3, "game": _3, "games": [1, { "pley": _4, "sheezy": _4 }], "gap": _3, "garden": _3, "gay": [1, { "pages": _4 }], "gbiz": _3, "gdn": [1, { "cnpy": _4 }], "gea": _3, "gent": _3, "genting": _3, "george": _3, "ggee": _3, "gift": _3, "gifts": _3, "gives": _3, "giving": _3, "glass": _3, "gle": _3, "global": [1, { "appwrite": _4 }], "globo": _3, "gmail": _3, "gmbh": _3, "gmo": _3, "gmx": _3, "godaddy": _3, "gold": _3, "goldpoint": _3, "golf": _3, "goo": _3, "goodyear": _3, "goog": [1, { "cloud": _4, "translate": _4, "usercontent": _7 }], "google": _3, "gop": _3, "got": _3, "grainger": _3, "graphics": _3, "gratis": _3, "green": _3, "gripe": _3, "grocery": _3, "group": [1, { "discourse": _4 }], "gucci": _3, "guge": _3, "guide": _3, "guitars": _3, "guru": _3, "hair": _3, "hamburg": _3, "hangout": _3, "haus": _3, "hbo": _3, "hdfc": _3, "hdfcbank": _3, "health": [1, { "hra": _4 }], "healthcare": _3, "help": _3, "helsinki": _3, "here": _3, "hermes": _3, "hiphop": _3, "hisamitsu": _3, "hitachi": _3, "hiv": _3, "hkt": _3, "hockey": _3, "holdings": _3, "holiday": _3, "homedepot": _3, "homegoods": _3, "homes": _3, "homesense": _3, "honda": _3, "horse": _3, "hospital": _3, "host": [1, { "cloudaccess": _4, "freesite": _4, "easypanel": _4, "fastvps": _4, "myfast": _4, "tempurl": _4, "wpmudev": _4, "jele": _4, "mircloud": _4, "wp2": _4, "half": _4 }], "hosting": [1, { "opencraft": _4 }], "hot": _3, "hotels": _3, "hotmail": _3, "house": _3, "how": _3, "hsbc": _3, "hughes": _3, "hyatt": _3, "hyundai": _3, "ibm": _3, "icbc": _3, "ice": _3, "icu": _3, "ieee": _3, "ifm": _3, "ikano": _3, "imamat": _3, "imdb": _3, "immo": _3, "immobilien": _3, "inc": _3, "industries": _3, "infiniti": _3, "ing": _3, "ink": _3, "institute": _3, "insurance": _3, "insure": _3, "international": _3, "intuit": _3, "investments": _3, "ipiranga": _3, "irish": _3, "ismaili": _3, "ist": _3, "istanbul": _3, "itau": _3, "itv": _3, "jaguar": _3, "java": _3, "jcb": _3, "jeep": _3, "jetzt": _3, "jewelry": _3, "jio": _3, "jll": _3, "jmp": _3, "jnj": _3, "joburg": _3, "jot": _3, "joy": _3, "jpmorgan": _3, "jprs": _3, "juegos": _3, "juniper": _3, "kaufen": _3, "kddi": _3, "kerryhotels": _3, "kerryproperties": _3, "kfh": _3, "kia": _3, "kids": _3, "kim": _3, "kindle": _3, "kitchen": _3, "kiwi": _3, "koeln": _3, "komatsu": _3, "kosher": _3, "kpmg": _3, "kpn": _3, "krd": [1, { "co": _4, "edu": _4 }], "kred": _3, "kuokgroup": _3, "kyoto": _3, "lacaixa": _3, "lamborghini": _3, "lamer": _3, "lancaster": _3, "land": _3, "landrover": _3, "lanxess": _3, "lasalle": _3, "lat": _3, "latino": _3, "latrobe": _3, "law": _3, "lawyer": _3, "lds": _3, "lease": _3, "leclerc": _3, "lefrak": _3, "legal": _3, "lego": _3, "lexus": _3, "lgbt": _3, "lidl": _3, "life": _3, "lifeinsurance": _3, "lifestyle": _3, "lighting": _3, "like": _3, "lilly": _3, "limited": _3, "limo": _3, "lincoln": _3, "link": [1, { "myfritz": _4, "cyon": _4, "dweb": _7, "inbrowser": _7, "nftstorage": _57, "mypep": _4, "storacha": _57, "w3s": _57 }], "live": [1, { "aem": _4, "hlx": _4, "ewp": _7 }], "living": _3, "llc": _3, "llp": _3, "loan": _3, "loans": _3, "locker": _3, "locus": _3, "lol": [1, { "omg": _4 }], "london": _3, "lotte": _3, "lotto": _3, "love": _3, "lpl": _3, "lplfinancial": _3, "ltd": _3, "ltda": _3, "lundbeck": _3, "luxe": _3, "luxury": _3, "madrid": _3, "maif": _3, "maison": _3, "makeup": _3, "man": _3, "management": _3, "mango": _3, "map": _3, "market": _3, "marketing": _3, "markets": _3, "marriott": _3, "marshalls": _3, "mattel": _3, "mba": _3, "mckinsey": _3, "med": _3, "media": _58, "meet": _3, "melbourne": _3, "meme": _3, "memorial": _3, "men": _3, "menu": [1, { "barsy": _4, "barsyonline": _4 }], "merck": _3, "merckmsd": _3, "miami": _3, "microsoft": _3, "mini": _3, "mint": _3, "mit": _3, "mitsubishi": _3, "mlb": _3, "mls": _3, "mma": _3, "mobile": _3, "moda": _3, "moe": _3, "moi": _3, "mom": [1, { "ind": _4 }], "monash": _3, "money": _3, "monster": _3, "mormon": _3, "mortgage": _3, "moscow": _3, "moto": _3, "motorcycles": _3, "mov": _3, "movie": _3, "msd": _3, "mtn": _3, "mtr": _3, "music": _3, "nab": _3, "nagoya": _3, "navy": _3, "nba": _3, "nec": _3, "netbank": _3, "netflix": _3, "network": [1, { "alces": _7, "co": _4, "arvo": _4, "azimuth": _4, "tlon": _4 }], "neustar": _3, "new": _3, "news": [1, { "noticeable": _4 }], "next": _3, "nextdirect": _3, "nexus": _3, "nfl": _3, "ngo": _3, "nhk": _3, "nico": _3, "nike": _3, "nikon": _3, "ninja": _3, "nissan": _3, "nissay": _3, "nokia": _3, "norton": _3, "now": _3, "nowruz": _3, "nowtv": _3, "nra": _3, "nrw": _3, "ntt": _3, "nyc": _3, "obi": _3, "observer": _3, "office": _3, "okinawa": _3, "olayan": _3, "olayangroup": _3, "ollo": _3, "omega": _3, "one": [1, { "kin": _7, "service": _4 }], "ong": [1, { "obl": _4 }], "onl": _3, "online": [1, { "eero": _4, "eero-stage": _4, "websitebuilder": _4, "barsy": _4 }], "ooo": _3, "open": _3, "oracle": _3, "orange": [1, { "tech": _4 }], "organic": _3, "origins": _3, "osaka": _3, "otsuka": _3, "ott": _3, "ovh": [1, { "nerdpol": _4 }], "page": [1, { "aem": _4, "hlx": _4, "hlx3": _4, "translated": _4, "codeberg": _4, "heyflow": _4, "prvcy": _4, "rocky": _4, "pdns": _4, "plesk": _4 }], "panasonic": _3, "paris": _3, "pars": _3, "partners": _3, "parts": _3, "party": _3, "pay": _3, "pccw": _3, "pet": _3, "pfizer": _3, "pharmacy": _3, "phd": _3, "philips": _3, "phone": _3, "photo": _3, "photography": _3, "photos": _58, "physio": _3, "pics": _3, "pictet": _3, "pictures": [1, { "1337": _4 }], "pid": _3, "pin": _3, "ping": _3, "pink": _3, "pioneer": _3, "pizza": [1, { "ngrok": _4 }], "place": _19, "play": _3, "playstation": _3, "plumbing": _3, "plus": _3, "pnc": _3, "pohl": _3, "poker": _3, "politie": _3, "porn": _3, "pramerica": _3, "praxi": _3, "press": _3, "prime": _3, "prod": _3, "productions": _3, "prof": _3, "progressive": _3, "promo": _3, "properties": _3, "property": _3, "protection": _3, "pru": _3, "prudential": _3, "pub": [1, { "id": _7, "kin": _7, "barsy": _4 }], "pwc": _3, "qpon": _3, "quebec": _3, "quest": _3, "racing": _3, "radio": _3, "read": _3, "realestate": _3, "realtor": _3, "realty": _3, "recipes": _3, "red": _3, "redstone": _3, "redumbrella": _3, "rehab": _3, "reise": _3, "reisen": _3, "reit": _3, "reliance": _3, "ren": _3, "rent": _3, "rentals": _3, "repair": _3, "report": _3, "republican": _3, "rest": _3, "restaurant": _3, "review": _3, "reviews": _3, "rexroth": _3, "rich": _3, "richardli": _3, "ricoh": _3, "ril": _3, "rio": _3, "rip": [1, { "clan": _4 }], "rocks": [1, { "myddns": _4, "stackit": _4, "lima-city": _4, "webspace": _4 }], "rodeo": _3, "rogers": _3, "room": _3, "rsvp": _3, "rugby": _3, "ruhr": _3, "run": [1, { "appwrite": _7, "development": _4, "ravendb": _4, "liara": [2, { "iran": _4 }], "servers": _4, "build": _7, "code": _7, "database": _7, "migration": _7, "onporter": _4, "repl": _4, "stackit": _4, "val": [0, { "express": _4, "web": _4 }], "wix": _4 }], "rwe": _3, "ryukyu": _3, "saarland": _3, "safe": _3, "safety": _3, "sakura": _3, "sale": _3, "salon": _3, "samsclub": _3, "samsung": _3, "sandvik": _3, "sandvikcoromant": _3, "sanofi": _3, "sap": _3, "sarl": _3, "sas": _3, "save": _3, "saxo": _3, "sbi": _3, "sbs": _3, "scb": _3, "schaeffler": _3, "schmidt": _3, "scholarships": _3, "school": _3, "schule": _3, "schwarz": _3, "science": _3, "scot": [1, { "gov": [2, { "service": _4 }] }], "search": _3, "seat": _3, "secure": _3, "security": _3, "seek": _3, "select": _3, "sener": _3, "services": [1, { "loginline": _4 }], "seven": _3, "sew": _3, "sex": _3, "sexy": _3, "sfr": _3, "shangrila": _3, "sharp": _3, "shell": _3, "shia": _3, "shiksha": _3, "shoes": _3, "shop": [1, { "base": _4, "hoplix": _4, "barsy": _4, "barsyonline": _4, "shopware": _4 }], "shopping": _3, "shouji": _3, "show": _3, "silk": _3, "sina": _3, "singles": _3, "site": [1, { "square": _4, "canva": _22, "cloudera": _7, "convex": _4, "cyon": _4, "fastvps": _4, "figma": _4, "heyflow": _4, "jele": _4, "jouwweb": _4, "loginline": _4, "barsy": _4, "notion": _4, "omniwe": _4, "opensocial": _4, "madethis": _4, "platformsh": _7, "tst": _7, "byen": _4, "srht": _4, "novecore": _4, "cpanel": _4, "wpsquared": _4 }], "ski": _3, "skin": _3, "sky": _3, "skype": _3, "sling": _3, "smart": _3, "smile": _3, "sncf": _3, "soccer": _3, "social": _3, "softbank": _3, "software": _3, "sohu": _3, "solar": _3, "solutions": _3, "song": _3, "sony": _3, "soy": _3, "spa": _3, "space": [1, { "myfast": _4, "heiyu": _4, "hf": [2, { "static": _4 }], "app-ionos": _4, "project": _4, "uber": _4, "xs4all": _4 }], "sport": _3, "spot": _3, "srl": _3, "stada": _3, "staples": _3, "star": _3, "statebank": _3, "statefarm": _3, "stc": _3, "stcgroup": _3, "stockholm": _3, "storage": _3, "store": [1, { "barsy": _4, "sellfy": _4, "shopware": _4, "storebase": _4 }], "stream": _3, "studio": _3, "study": _3, "style": _3, "sucks": _3, "supplies": _3, "supply": _3, "support": [1, { "barsy": _4 }], "surf": _3, "surgery": _3, "suzuki": _3, "swatch": _3, "swiss": _3, "sydney": _3, "systems": [1, { "knightpoint": _4 }], "tab": _3, "taipei": _3, "talk": _3, "taobao": _3, "target": _3, "tatamotors": _3, "tatar": _3, "tattoo": _3, "tax": _3, "taxi": _3, "tci": _3, "tdk": _3, "team": [1, { "discourse": _4, "jelastic": _4 }], "tech": [1, { "cleverapps": _4 }], "technology": _19, "temasek": _3, "tennis": _3, "teva": _3, "thd": _3, "theater": _3, "theatre": _3, "tiaa": _3, "tickets": _3, "tienda": _3, "tips": _3, "tires": _3, "tirol": _3, "tjmaxx": _3, "tjx": _3, "tkmaxx": _3, "tmall": _3, "today": [1, { "prequalifyme": _4 }], "tokyo": _3, "tools": [1, { "addr": _47, "myaddr": _4 }], "top": [1, { "ntdll": _4, "wadl": _7 }], "toray": _3, "toshiba": _3, "total": _3, "tours": _3, "town": _3, "toyota": _3, "toys": _3, "trade": _3, "trading": _3, "training": _3, "travel": _3, "travelers": _3, "travelersinsurance": _3, "trust": _3, "trv": _3, "tube": _3, "tui": _3, "tunes": _3, "tushu": _3, "tvs": _3, "ubank": _3, "ubs": _3, "unicom": _3, "university": _3, "uno": _3, "uol": _3, "ups": _3, "vacations": _3, "vana": _3, "vanguard": _3, "vegas": _3, "ventures": _3, "verisign": _3, "versicherung": _3, "vet": _3, "viajes": _3, "video": _3, "vig": _3, "viking": _3, "villas": _3, "vin": _3, "vip": _3, "virgin": _3, "visa": _3, "vision": _3, "viva": _3, "vivo": _3, "vlaanderen": _3, "vodka": _3, "volvo": _3, "vote": _3, "voting": _3, "voto": _3, "voyage": _3, "wales": _3, "walmart": _3, "walter": _3, "wang": _3, "wanggou": _3, "watch": _3, "watches": _3, "weather": _3, "weatherchannel": _3, "webcam": _3, "weber": _3, "website": _58, "wed": _3, "wedding": _3, "weibo": _3, "weir": _3, "whoswho": _3, "wien": _3, "wiki": _58, "williamhill": _3, "win": _3, "windows": _3, "wine": _3, "winners": _3, "wme": _3, "wolterskluwer": _3, "woodside": _3, "work": _3, "works": _3, "world": _3, "wow": _3, "wtc": _3, "wtf": _3, "xbox": _3, "xerox": _3, "xihuan": _3, "xin": _3, "xn--11b4c3d": _3, "\u0915\u0949\u092E": _3, "xn--1ck2e1b": _3, "\u30BB\u30FC\u30EB": _3, "xn--1qqw23a": _3, "\u4F5B\u5C71": _3, "xn--30rr7y": _3, "\u6148\u5584": _3, "xn--3bst00m": _3, "\u96C6\u56E2": _3, "xn--3ds443g": _3, "\u5728\u7EBF": _3, "xn--3pxu8k": _3, "\u70B9\u770B": _3, "xn--42c2d9a": _3, "\u0E04\u0E2D\u0E21": _3, "xn--45q11c": _3, "\u516B\u5366": _3, "xn--4gbrim": _3, "\u0645\u0648\u0642\u0639": _3, "xn--55qw42g": _3, "\u516C\u76CA": _3, "xn--55qx5d": _3, "\u516C\u53F8": _3, "xn--5su34j936bgsg": _3, "\u9999\u683C\u91CC\u62C9": _3, "xn--5tzm5g": _3, "\u7F51\u7AD9": _3, "xn--6frz82g": _3, "\u79FB\u52A8": _3, "xn--6qq986b3xl": _3, "\u6211\u7231\u4F60": _3, "xn--80adxhks": _3, "\u043C\u043E\u0441\u043A\u0432\u0430": _3, "xn--80aqecdr1a": _3, "\u043A\u0430\u0442\u043E\u043B\u0438\u043A": _3, "xn--80asehdb": _3, "\u043E\u043D\u043B\u0430\u0439\u043D": _3, "xn--80aswg": _3, "\u0441\u0430\u0439\u0442": _3, "xn--8y0a063a": _3, "\u8054\u901A": _3, "xn--9dbq2a": _3, "\u05E7\u05D5\u05DD": _3, "xn--9et52u": _3, "\u65F6\u5C1A": _3, "xn--9krt00a": _3, "\u5FAE\u535A": _3, "xn--b4w605ferd": _3, "\u6DE1\u9A6C\u9521": _3, "xn--bck1b9a5dre4c": _3, "\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3": _3, "xn--c1avg": _3, "\u043E\u0440\u0433": _3, "xn--c2br7g": _3, "\u0928\u0947\u091F": _3, "xn--cck2b3b": _3, "\u30B9\u30C8\u30A2": _3, "xn--cckwcxetd": _3, "\u30A2\u30DE\u30BE\u30F3": _3, "xn--cg4bki": _3, "\uC0BC\uC131": _3, "xn--czr694b": _3, "\u5546\u6807": _3, "xn--czrs0t": _3, "\u5546\u5E97": _3, "xn--czru2d": _3, "\u5546\u57CE": _3, "xn--d1acj3b": _3, "\u0434\u0435\u0442\u0438": _3, "xn--eckvdtc9d": _3, "\u30DD\u30A4\u30F3\u30C8": _3, "xn--efvy88h": _3, "\u65B0\u95FB": _3, "xn--fct429k": _3, "\u5BB6\u96FB": _3, "xn--fhbei": _3, "\u0643\u0648\u0645": _3, "xn--fiq228c5hs": _3, "\u4E2D\u6587\u7F51": _3, "xn--fiq64b": _3, "\u4E2D\u4FE1": _3, "xn--fjq720a": _3, "\u5A31\u4E50": _3, "xn--flw351e": _3, "\u8C37\u6B4C": _3, "xn--fzys8d69uvgm": _3, "\u96FB\u8A0A\u76C8\u79D1": _3, "xn--g2xx48c": _3, "\u8D2D\u7269": _3, "xn--gckr3f0f": _3, "\u30AF\u30E9\u30A6\u30C9": _3, "xn--gk3at1e": _3, "\u901A\u8CA9": _3, "xn--hxt814e": _3, "\u7F51\u5E97": _3, "xn--i1b6b1a6a2e": _3, "\u0938\u0902\u0917\u0920\u0928": _3, "xn--imr513n": _3, "\u9910\u5385": _3, "xn--io0a7i": _3, "\u7F51\u7EDC": _3, "xn--j1aef": _3, "\u043A\u043E\u043C": _3, "xn--jlq480n2rg": _3, "\u4E9A\u9A6C\u900A": _3, "xn--jvr189m": _3, "\u98DF\u54C1": _3, "xn--kcrx77d1x4a": _3, "\u98DE\u5229\u6D66": _3, "xn--kput3i": _3, "\u624B\u673A": _3, "xn--mgba3a3ejt": _3, "\u0627\u0631\u0627\u0645\u0643\u0648": _3, "xn--mgba7c0bbn0a": _3, "\u0627\u0644\u0639\u0644\u064A\u0627\u0646": _3, "xn--mgbab2bd": _3, "\u0628\u0627\u0632\u0627\u0631": _3, "xn--mgbca7dzdo": _3, "\u0627\u0628\u0648\u0638\u0628\u064A": _3, "xn--mgbi4ecexp": _3, "\u0643\u0627\u062B\u0648\u0644\u064A\u0643": _3, "xn--mgbt3dhd": _3, "\u0647\u0645\u0631\u0627\u0647": _3, "xn--mk1bu44c": _3, "\uB2F7\uCEF4": _3, "xn--mxtq1m": _3, "\u653F\u5E9C": _3, "xn--ngbc5azd": _3, "\u0634\u0628\u0643\u0629": _3, "xn--ngbe9e0a": _3, "\u0628\u064A\u062A\u0643": _3, "xn--ngbrx": _3, "\u0639\u0631\u0628": _3, "xn--nqv7f": _3, "\u673A\u6784": _3, "xn--nqv7fs00ema": _3, "\u7EC4\u7EC7\u673A\u6784": _3, "xn--nyqy26a": _3, "\u5065\u5EB7": _3, "xn--otu796d": _3, "\u62DB\u8058": _3, "xn--p1acf": [1, { "xn--90amc": _4, "xn--j1aef": _4, "xn--j1ael8b": _4, "xn--h1ahn": _4, "xn--j1adp": _4, "xn--c1avg": _4, "xn--80aaa0cvac": _4, "xn--h1aliz": _4, "xn--90a1af": _4, "xn--41a": _4 }], "\u0440\u0443\u0441": [1, { "\u0431\u0438\u0437": _4, "\u043A\u043E\u043C": _4, "\u043A\u0440\u044B\u043C": _4, "\u043C\u0438\u0440": _4, "\u043C\u0441\u043A": _4, "\u043E\u0440\u0433": _4, "\u0441\u0430\u043C\u0430\u0440\u0430": _4, "\u0441\u043E\u0447\u0438": _4, "\u0441\u043F\u0431": _4, "\u044F": _4 }], "xn--pssy2u": _3, "\u5927\u62FF": _3, "xn--q9jyb4c": _3, "\u307F\u3093\u306A": _3, "xn--qcka1pmc": _3, "\u30B0\u30FC\u30B0\u30EB": _3, "xn--rhqv96g": _3, "\u4E16\u754C": _3, "xn--rovu88b": _3, "\u66F8\u7C4D": _3, "xn--ses554g": _3, "\u7F51\u5740": _3, "xn--t60b56a": _3, "\uB2F7\uB137": _3, "xn--tckwe": _3, "\u30B3\u30E0": _3, "xn--tiq49xqyj": _3, "\u5929\u4E3B\u6559": _3, "xn--unup4y": _3, "\u6E38\u620F": _3, "xn--vermgensberater-ctb": _3, "verm\xF6gensberater": _3, "xn--vermgensberatung-pwb": _3, "verm\xF6gensberatung": _3, "xn--vhquv": _3, "\u4F01\u4E1A": _3, "xn--vuq861b": _3, "\u4FE1\u606F": _3, "xn--w4r85el8fhu5dnra": _3, "\u5609\u91CC\u5927\u9152\u5E97": _3, "xn--w4rs40l": _3, "\u5609\u91CC": _3, "xn--xhq521b": _3, "\u5E7F\u4E1C": _3, "xn--zfr164b": _3, "\u653F\u52A1": _3, "xyz": [1, { "botdash": _4, "telebit": _7 }], "yachts": _3, "yahoo": _3, "yamaxun": _3, "yandex": _3, "yodobashi": _3, "yoga": _3, "yokohama": _3, "you": _3, "youtube": _3, "yun": _3, "zappos": _3, "zara": _3, "zero": _3, "zip": _3, "zone": [1, { "cloud66": _4, "triton": _7, "stackit": _4, "lima": _4 }], "zuerich": _3 }];
      return rules2;
    })();
    function lookupInTrie(parts, trie, index, allowedMask) {
      let result = null;
      let node = trie;
      while (node !== void 0) {
        if ((node[0] & allowedMask) !== 0) {
          result = {
            index: index + 1,
            isIcann: node[0] === 1,
            isPrivate: node[0] === 2
          };
        }
        if (index === -1) {
          break;
        }
        const succ = node[1];
        node = Object.prototype.hasOwnProperty.call(succ, parts[index]) ? succ[parts[index]] : succ["*"];
        index -= 1;
      }
      return result;
    }
    function suffixLookup(hostname, options, out) {
      var _a;
      if (fastPathLookup(hostname, options, out)) {
        return;
      }
      const hostnameParts = hostname.split(".");
      const allowedMask = (options.allowPrivateDomains ? 2 : 0) | (options.allowIcannDomains ? 1 : 0);
      const exceptionMatch = lookupInTrie(hostnameParts, exceptions, hostnameParts.length - 1, allowedMask);
      if (exceptionMatch !== null) {
        out.isIcann = exceptionMatch.isIcann;
        out.isPrivate = exceptionMatch.isPrivate;
        out.publicSuffix = hostnameParts.slice(exceptionMatch.index + 1).join(".");
        return;
      }
      const rulesMatch = lookupInTrie(hostnameParts, rules, hostnameParts.length - 1, allowedMask);
      if (rulesMatch !== null) {
        out.isIcann = rulesMatch.isIcann;
        out.isPrivate = rulesMatch.isPrivate;
        out.publicSuffix = hostnameParts.slice(rulesMatch.index).join(".");
        return;
      }
      out.isIcann = false;
      out.isPrivate = false;
      out.publicSuffix = (_a = hostnameParts[hostnameParts.length - 1]) !== null && _a !== void 0 ? _a : null;
    }
    var RESULT = getEmptyResult();
    function parse2(url, options = {}) {
      return parseImpl(url, 5, suffixLookup, options, getEmptyResult());
    }
    function getHostname(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 0, suffixLookup, options, RESULT).hostname;
    }
    function getPublicSuffix(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 2, suffixLookup, options, RESULT).publicSuffix;
    }
    function getDomain(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 3, suffixLookup, options, RESULT).domain;
    }
    function getSubdomain(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 4, suffixLookup, options, RESULT).subdomain;
    }
    function getDomainWithoutSuffix(url, options = {}) {
      resetResult(RESULT);
      return parseImpl(url, 5, suffixLookup, options, RESULT).domainWithoutSuffix;
    }
    exports2.getDomain = getDomain;
    exports2.getDomainWithoutSuffix = getDomainWithoutSuffix;
    exports2.getHostname = getHostname;
    exports2.getPublicSuffix = getPublicSuffix;
    exports2.getSubdomain = getSubdomain;
    exports2.parse = parse2;
  }
});

// apps/server/src/volcano-handler.ts
var volcano_handler_exports = {};
__export(volcano_handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(volcano_handler_exports);

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/utils/buffer.js
var bufferToFormData = (arrayBuffer, contentType) => {
  return new Response(arrayBuffer, { headers: { "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase()) } }).formData();
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/utils/body.js
var MAX_NESTED_OBJECTS = 1e4;
var isRawRequest = (request) => "headers" in request;
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const mediaType = (isRawRequest(request) ? request.headers : request.raw.headers).get("Content-Type")?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") return parseFormData(request, {
    all,
    dot
  });
  return {};
};
async function parseFormData(request, options) {
  if (!isRawRequest(request) && request.bodyCache.formData) return convertFormDataToBodyData(await request.bodyCache.formData, options);
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) request.bodyCache.formData = formDataPromise;
  const formData = await formDataPromise;
  if (formData) return convertFormDataToBodyData(formData, options);
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  const nestingState = { count: 0 };
  formData.forEach((value, key) => {
    if (!(options.all || key.endsWith("[]"))) form[key] = value;
    else handleParsingAllValues(form, key, value);
  });
  if (options.dot) Object.entries(form).forEach(([key, value]) => {
    if (key.includes(".")) {
      handleParsingNestedValues(form, key, value, nestingState);
      delete form[key];
    }
  });
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) form[key].push(value);
    else form[key] = [form[key], value];
  } else if (!key.endsWith("[]")) form[key] = value;
  else form[key] = [value];
};
var handleParsingNestedValues = (form, key, value, state) => {
  if (/(?:^|\.)__proto__\./.test(key)) return;
  let nestedForm = form;
  const keys = key.split(".", 34);
  if (keys.length > 33) throwNestingLimitExceeded();
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) nestedForm[key2] = value;
    else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        if (state.count++ >= MAX_NESTED_OBJECTS) throwNestingLimitExceeded();
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};
var throwNestingLimitExceeded = () => {
  throw new Error("Nesting limit exceeded");
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/utils/url.js
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") paths.shift();
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return {
    groups,
    path
  };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j2 = paths.length - 1; j2 >= 0; j2--) if (paths[j2].includes(mark)) {
      paths[j2] = paths[j2].replace(mark, groups[i][1]);
      break;
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") return "*";
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [
        cacheKey,
        match2[1],
        new RegExp(`^${match2[2]}(?=/${next})`)
      ] : [
        label,
        match2[1],
        new RegExp(`^${match2[2]}$`)
      ];
      else patternCache[cacheKey] = [
        label,
        match2[1],
        true
      ];
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) break;
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) sub = mergePath(sub, ...rest);
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) return null;
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) basePath += "/" + segment;
    else if (/\:/.test(segment)) {
      if (segment.charCodeAt(segment.length - 1) === 63) {
        if (results.length === 0 && basePath === "") results.push("/");
        else results.push(basePath);
        const optionalSegment = segment.slice(0, -1);
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else basePath += "/" + segment;
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var tryDecodeURIComponent = (str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str;
var _decodeURI = (value) => {
  if (value.indexOf("+") !== -1) value = value.replace(/\+/g, " ");
  return tryDecodeURIComponent(value);
};
var _getQueryParam = (url, key, multiple) => {
  const hashIndex = url.indexOf("#", 8);
  if (hashIndex !== -1) url = url.slice(0, hashIndex);
  let encoded;
  if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) return;
    if (!url.startsWith(key, keyIndex2 + 1)) keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) return "";
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) return;
  }
  const results = /* @__PURE__ */ Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) valueIndex = -1;
    let name = url.slice(keyIndex + 1, valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex);
    if (encoded) name = _decodeURI(name);
    keyIndex = nextKeyIndex;
    if (name === "") continue;
    let value;
    if (valueIndex === -1) value = "";
    else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) value = _decodeURI(value);
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) results[name] = [];
      results[name].push(value);
    } else results[name] ??= value;
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/request.js
var HonoRequest = class {
  /**
  * `.raw` can get the raw Request object.
  *
  * @see {@link https://hono.dev/docs/api/request#raw}
  *
  * @example
  * ```ts
  * // For Cloudflare Workers
  * app.post('/', async (c) => {
  *   const metadata = c.req.raw.cf?.hostMetadata?
  *   ...
  * })
  * ```
  */
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  /**
  * `.path` can get the pathname of the request.
  *
  * @see {@link https://hono.dev/docs/api/request#path}
  *
  * @example
  * ```ts
  * app.get('/about/me', (c) => {
  *   const pathname = c.req.path // `/about/me`
  * })
  * ```
  */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex]?.[1][key];
    const param = this.#getParamValue(paramKey);
    return param && tryDecodeURIComponent(param);
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex]?.[1] ?? {});
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) decoded[key] = tryDecodeURIComponent(value);
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) return this.raw.headers.get(name) ?? void 0;
    const headerData = /* @__PURE__ */ Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) return cachedBody;
    for (const anyCachedKey in bodyCache) return bodyCache[anyCachedKey].then((body) => {
      if (anyCachedKey === "json") body = JSON.stringify(body);
      const contentType = anyCachedKey === "formData" ? void 0 : raw2.headers.get("content-type");
      return new Response(body, { headers: contentType ? { "Content-Type": contentType } : void 0 })[key]();
    });
    return bodyCache[key] = raw2[key]();
  };
  /**
  * `.json()` can parse Request body of type `application/json`
  *
  * @see {@link https://hono.dev/docs/api/request#json}
  *
  * @example
  * ```ts
  * app.post('/entry', async (c) => {
  *   const body = await c.req.json()
  * })
  * ```
  */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
  * `.text()` can parse Request body of type `text/plain`
  *
  * @see {@link https://hono.dev/docs/api/request#text}
  *
  * @example
  * ```ts
  * app.post('/entry', async (c) => {
  *   const body = await c.req.text()
  * })
  * ```
  */
  text() {
    return this.#cachedBody("text");
  }
  /**
  * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
  *
  * @see {@link https://hono.dev/docs/api/request#arraybuffer}
  *
  * @example
  * ```ts
  * app.post('/entry', async (c) => {
  *   const body = await c.req.arrayBuffer()
  * })
  * ```
  */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
  * `.bytes()` parses the request body as a `Uint8Array`.
  *
  * @see {@link https://hono.dev/docs/api/request#bytes}
  *
  * @example
  * ```ts
  * app.post('/entry', async (c) => {
  *   const body = await c.req.bytes()
  * })
  * ```
  */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
  * Parses the request body as a `Blob`.
  * @example
  * ```ts
  * app.post('/entry', async (c) => {
  *   const body = await c.req.blob();
  * });
  * ```
  * @see https://hono.dev/docs/api/request#blob
  */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
  * Parses the request body as `FormData`.
  * @example
  * ```ts
  * app.post('/entry', async (c) => {
  *   const body = await c.req.formData();
  * });
  * ```
  * @see https://hono.dev/docs/api/request#formdata
  */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
  * Adds validated data to the request.
  *
  * @param target - The target of the validation.
  * @param data - The validated data to add.
  */
  addValidatedData(target, data) {
    (this.#validatedData ??= {})[target] = data;
  }
  valid(target) {
    return this.#validatedData?.[target];
  }
  /**
  * `.url` can get the request url strings.
  *
  * @see {@link https://hono.dev/docs/api/request#url}
  *
  * @example
  * ```ts
  * app.get('/about/me', (c) => {
  *   const url = c.req.url // `http://localhost:8787/about/me`
  *   ...
  * })
  * ```
  */
  get url() {
    return this.raw.url;
  }
  /**
  * `.method` can get the method name of the request.
  *
  * @see {@link https://hono.dev/docs/api/request#method}
  *
  * @example
  * ```ts
  * app.get('/about/me', (c) => {
  *   const method = c.req.method // `GET`
  * })
  * ```
  */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
  * `.matchedRoutes` can return a matched route in the handler
  *
  * @deprecated
  *
  * Use matchedRoutes helper defined in "hono/route" instead.
  *
  * @see {@link https://hono.dev/docs/api/request#matchedroutes}
  *
  * @example
  * ```ts
  * app.use('*', async function logger(c, next) {
  *   await next()
  *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
  *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
  *     console.log(
  *       method,
  *       ' ',
  *       path,
  *       ' '.repeat(Math.max(10 - path.length, 0)),
  *       name,
  *       i === c.req.routeIndex ? '<- respond from here' : ''
  *     )
  *   })
  * })
  * ```
  */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
  * `.routePath` can retrieve the path registered within the handler
  *
  * @deprecated
  *
  * Use routePath helper defined in "hono/route" instead.
  *
  * @see {@link https://hono.dev/docs/api/request#routepath}
  *
  * @example
  * ```ts
  * app.get('/posts/:id', (c) => {
  *   return c.json({ path: c.req.routePath })
  * })
  * ```
  */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) str = str.toString();
    if (str instanceof Promise) str = await str;
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) return Promise.resolve(str);
  if (buffer) buffer[0] += str;
  else buffer = [str];
  const resStr = Promise.all(callbacks.map((c) => c({
    phase,
    buffer,
    context
  }))).then((res) => Promise.all(res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))).then(() => buffer[0]));
  if (preserveCallbacks) return raw(await resStr, callbacks);
  else return resStr;
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  /**
  * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
  *
  * @see {@link https://hono.dev/docs/api/context#env}
  *
  * @example
  * ```ts
  * // Environment object for Cloudflare Workers
  * app.get('*', async c => {
  *   const counter = c.env.COUNTER
  * })
  * ```
  */
  env = {};
  #var;
  finalized = false;
  /**
  * `.error` can get the error object from the middleware if the Handler throws an error.
  *
  * @see {@link https://hono.dev/docs/api/context#error}
  *
  * @example
  * ```ts
  * app.use('*', async (c, next) => {
  *   await next()
  *   if (c.error) {
  *     // do something...
  *   }
  * })
  * ```
  */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
  * Creates an instance of the Context class.
  *
  * @param req - The Request object.
  * @param options - Optional configuration options for the context.
  */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
  * `.req` is the instance of {@link HonoRequest}.
  */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
  * @see {@link https://hono.dev/docs/api/context#event}
  * The FetchEvent associated with the current request.
  *
  * @throws Will throw an error if the context does not have a FetchEvent.
  */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) return this.#executionCtx;
    else throw Error("This context has no FetchEvent");
  }
  /**
  * @see {@link https://hono.dev/docs/api/context#executionctx}
  * The ExecutionContext associated with the current request.
  *
  * @throws Will throw an error if the context does not have an ExecutionContext.
  */
  get executionCtx() {
    if (this.#executionCtx) return this.#executionCtx;
    else throw Error("This context has no ExecutionContext");
  }
  /**
  * @see {@link https://hono.dev/docs/api/context#res}
  * The Response object for the current request.
  */
  get res() {
    return this.#res ||= createResponseInstance(null, { headers: this.#preparedHeaders ??= new Headers() });
  }
  /**
  * Sets the Response object for the current request.
  *
  * @param _res - The Response object to set.
  */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k2, v] of this.#res.headers.entries()) {
        if (k2 === "content-type") continue;
        if (k2 === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) _res.headers.append("set-cookie", cookie);
        } else _res.headers.set(k2, v);
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
  * `.render()` can create a response within a layout.
  *
  * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
  *
  * @example
  * ```ts
  * app.get('/', (c) => {
  *   return c.render('Hello!')
  * })
  * ```
  */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
  * Sets the layout for the response.
  *
  * @param layout - The layout to set.
  * @returns The layout function.
  */
  setLayout = (layout) => this.#layout = layout;
  /**
  * Gets the current layout for the response.
  *
  * @returns The current layout function.
  */
  getLayout = () => this.#layout;
  /**
  * `.setRenderer()` can set the layout in the custom middleware.
  *
  * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
  *
  * @example
  * ```tsx
  * app.use('*', async (c, next) => {
  *   c.setRenderer((content) => {
  *     return c.html(
  *       <html>
  *         <body>
  *           <p>{content}</p>
  *         </body>
  *       </html>
  *     )
  *   })
  *   await next()
  * })
  * ```
  */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
  * `.header()` can set headers.
  *
  * @see {@link https://hono.dev/docs/api/context#header}
  *
  * @example
  * ```ts
  * app.get('/welcome', (c) => {
  *   // Set headers
  *   c.header('X-Message', 'Hello!')
  *   c.header('Content-Type', 'text/plain')
  *
  *   // Append multiple headers using the append option (e.g. Vary)
  *   c.header('Vary', 'Accept-Encoding', { append: true })
  *   c.header('Vary', 'User-Agent', { append: true })
  *
  *   return c.body('Thank you for coming')
  * })
  * ```
  */
  header = (name, value, options) => {
    if (this.finalized) this.#res = createResponseInstance(this.#res.body, this.#res);
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) headers.delete(name);
    else if (options?.append) headers.append(name, value);
    else headers.set(name, value);
  };
  status = (status) => {
    this.#status = status;
  };
  /**
  * `.set()` can set the value specified by the key.
  *
  * @see {@link https://hono.dev/docs/api/context#set-get}
  *
  * @example
  * ```ts
  * app.use('*', async (c, next) => {
  *   c.set('message', 'Hono is hot!!')
  *   await next()
  * })
  * ```
  */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
  * `.get()` can use the value specified by the key.
  *
  * @see {@link https://hono.dev/docs/api/context#set-get}
  *
  * @example
  * ```ts
  * app.get('/', (c) => {
  *   const message = c.get('message')
  *   return c.text(`The message is "${message}"`)
  * })
  * ```
  */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
  * `.var` can access the value of a variable.
  *
  * @see {@link https://hono.dev/docs/api/context#var}
  *
  * @example
  * ```ts
  * const result = c.var.client.oneMethod()
  * ```
  */
  get var() {
    if (!this.#var) return {};
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
    if (typeof arg === "object" && arg.headers) {
      responseHeaders ??= new Headers();
      for (const [key, value] of new Headers(arg.headers)) if (key === "set-cookie") responseHeaders.append(key, value);
      else responseHeaders.set(key, value);
    }
    if (headers) {
      if (!responseHeaders) {
        let count = 0;
        for (const k2 in headers) if (++count > 1 || typeof headers[k2] !== "string") {
          responseHeaders = new Headers();
          break;
        }
      }
      if (responseHeaders) for (const k2 in headers) {
        const v = headers[k2];
        if (typeof v === "string") responseHeaders.set(k2, v);
        else {
          responseHeaders.delete(k2);
          for (const v2 of v) responseHeaders.append(k2, v2);
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, {
      status,
      headers: responseHeaders ?? headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
  * `.body()` can return the HTTP response.
  * You can set headers with `.header()` and set HTTP status code with `.status`.
  * This can also be set in `.text()`, `.json()` and so on.
  *
  * @see {@link https://hono.dev/docs/api/context#body}
  *
  * @example
  * ```ts
  * app.get('/welcome', (c) => {
  *   // Set headers
  *   c.header('X-Message', 'Hello!')
  *   c.header('Content-Type', 'text/plain')
  *   // Set HTTP status code
  *   c.status(201)
  *
  *   // Return the response body
  *   return c.body('Thank you for coming')
  * })
  * ```
  */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
  * `.text()` can render text as `Content-Type:text/plain`.
  *
  * @see {@link https://hono.dev/docs/api/context#text}
  *
  * @example
  * ```ts
  * app.get('/say', (c) => {
  *   return c.text('Hello!')
  * })
  * ```
  */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(text, arg, setDefaultContentType(TEXT_PLAIN, headers));
  };
  /**
  * `.json()` can render JSON as `Content-Type:application/json`.
  *
  * @see {@link https://hono.dev/docs/api/context#json}
  *
  * @example
  * ```ts
  * app.get('/api', (c) => {
  *   return c.json({ message: 'Hello!' })
  * })
  * ```
  */
  json = (object, arg, headers) => {
    return this.#newResponse(JSON.stringify(object), arg, setDefaultContentType("application/json", headers));
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
  * `.redirect()` can Redirect, default status code is 302.
  *
  * @see {@link https://hono.dev/docs/api/context#redirect}
  *
  * @example
  * ```ts
  * app.get('/redirect', (c) => {
  *   return c.redirect('/')
  * })
  * app.get('/redirect-permanently', (c) => {
  *   return c.redirect('/', 301)
  * })
  * ```
  */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header("Location", !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString));
    return this.newResponse(null, status ?? 302);
  };
  /**
  * `.notFound()` can return the Not Found Response.
  *
  * @see {@link https://hono.dev/docs/api/context#notfound}
  *
  * @example
  * ```ts
  * app.get('/notfound', (c) => {
  *   return c.notFound()
  * })
  * ```
  */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      let res;
      let isError = false;
      let handler2;
      if (middleware[i]) {
        handler2 = middleware[i][0][0];
        context.req.routeIndex = i;
      } else handler2 = i === middleware.length && next || void 0;
      if (handler2) try {
        res = await handler2(context, () => dispatch(i + 1));
      } catch (err) {
        if (err instanceof Error && onError) {
          context.error = err;
          res = await onError(err, context);
          isError = true;
        } else throw err;
      }
      else if (context.finalized === false && onNotFound) res = await onNotFound(context);
      if (res && (context.finalized === false || isError)) context.res = res;
      return context;
    }
  };
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router.js
var METHODS = [
  "get",
  "post",
  "put",
  "delete",
  "options",
  "patch",
  "query"
];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class Hono2 {
  get;
  post;
  put;
  delete;
  options;
  patch;
  query;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    [...METHODS, "all"].forEach((method) => {
      this[method] = (args1, ...args) => {
        const methodName = method.toUpperCase();
        if (typeof args1 === "string") this.#path = args1;
        else this.#addRoute(methodName, this.#path, args1);
        args.forEach((handler2) => {
          this.#addRoute(methodName, this.#path, handler2);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          const methodName = m.toUpperCase();
          for (const handler2 of handlers) this.#addRoute(methodName, this.#path, handler2);
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") this.#path = arg1;
      else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler2) => {
        this.#addRoute("ALL", this.#path, handler2);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono2({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  /**
  * `.route()` allows grouping other Hono instance in routes.
  *
  * @see {@link https://hono.dev/docs/api/routing#grouping}
  *
  * @param {string} path - base Path
  * @param {Hono} app - other Hono instance
  * @returns {Hono} routed Hono instance
  *
  * @example
  * ```ts
  * const app = new Hono()
  * const app2 = new Hono()
  *
  * app2.get("/user", (c) => c.text("user"))
  * app.route("/api", app2) // GET /api/user
  * ```
  */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler2;
      if (app2.errorHandler === errorHandler) handler2 = r.handler;
      else {
        handler2 = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
        handler2[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler2, r.basePath);
    });
    return this;
  }
  /**
  * `.basePath()` allows base paths to be specified.
  *
  * @see {@link https://hono.dev/docs/api/routing#base-path}
  *
  * @param {string} path - base Path
  * @returns {Hono} changed Hono instance
  *
  * @example
  * ```ts
  * const api = new Hono().basePath('/api')
  * ```
  */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
  * `.onError()` handles an error and returns a customized Response.
  *
  * @see {@link https://hono.dev/docs/api/hono#error-handling}
  *
  * @param {ErrorHandler} handler - request Handler for error
  * @returns {Hono} changed Hono instance
  *
  * @example
  * ```ts
  * app.onError((err, c) => {
  *   console.error(`${err}`)
  *   return c.text('Custom Error Message', 500)
  * })
  * ```
  */
  onError = (handler2) => {
    this.errorHandler = handler2;
    return this;
  };
  /**
  * `.notFound()` allows you to customize a Not Found Response.
  *
  * @see {@link https://hono.dev/docs/api/hono#not-found}
  *
  * @param {NotFoundHandler} handler - request handler for not-found
  * @returns {Hono} changed Hono instance
  *
  * @example
  * ```ts
  * app.notFound((c) => {
  *   return c.text('Custom 404 Message', 404)
  * })
  * ```
  */
  notFound = (handler2) => {
    this.#notFoundHandler = handler2;
    return this;
  };
  /**
  * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
  *
  * @deprecated Use `mount()` from `hono/mount` instead. `.mount()` will be removed in v5.
  *
  * @see {@link https://hono.dev/docs/api/hono#mount}
  *
  * @param {string} path - base Path
  * @param {Function} applicationHandler - other Request Handler
  * @param {MountOptions} [options] - options of `.mount()`
  * @returns {Hono} mounted Hono instance
  *
  * @example
  * ```ts
  * import { Router as IttyRouter } from 'itty-router'
  * import { Hono } from 'hono'
  * // Create itty-router application
  * const ittyRouter = IttyRouter()
  * // GET /itty-router/hello
  * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
  *
  * const app = new Hono()
  * app.mount('/itty-router', ittyRouter.handle)
  * ```
  *
  * @example
  * ```ts
  * const app = new Hono()
  * // Send the request to another application without modification.
  * app.mount('/app', anotherApp, {
  *   replaceRequest: (req) => req,
  * })
  * ```
  */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") optionHandler = options;
      else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) replaceRequest = (request) => request;
        else replaceRequest = options.replaceRequest;
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler2 = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) return res;
      await next();
    };
    this.#addRoute("ALL", mergePath(path, "*"), handler2);
    return this;
  }
  #addRoute(method, path, handler2, baseRoutePath) {
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler: handler2
    };
    this.router.add(method, path, [handler2, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) return this.errorHandler(err, c);
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    const path = this.getPath(request, { env });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then((resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
  * `.fetch()` will be entry point of your app.
  *
  * @see {@link https://hono.dev/docs/api/hono#fetch}
  *
  * @param {Request} request - request Object of request
  * @param {Env} env - env Object
  * @param {ExecutionContext} executionCtx - context of execution
  * @returns {Response | Promise<Response>} response of request
  *
  */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
  * `.request()` is a useful method for testing.
  * You can pass a URL or pathname to send a GET request.
  * app will return a Response object.
  * ```ts
  * test('GET /hello is ok', async () => {
  *   const res = await app.request('/hello')
  *   expect(res.status).toBe(200)
  * })
  * ```
  * @see https://hono.dev/docs/api/hono#request
  */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    input = input.toString();
    return this.fetch(new Request(/^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`, requestInit), Env, executionCtx);
  };
  /**
  * `.fire()` automatically adds a global fetch event listener.
  * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
  * @deprecated
  * Use `fire` from `hono/service-worker` instead.
  * ```ts
  * import { Hono } from 'hono'
  * import { fire } from 'hono/service-worker'
  *
  * const app = new Hono()
  * // ...
  * fire(app)
  * ```
  * @see https://hono.dev/docs/api/hono#fire
  * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
  * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
  */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router/utils.js
var createNullObject = () => /* @__PURE__ */ Object.create(null);

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = ((method2, path2) => {
    const matcher = matchers[method2] || matchers["ALL"];
    const staticMatch = matcher[2][path2];
    if (staticMatch) return staticMatch;
    const match3 = path2.match(matcher[0]);
    if (!match3) return [[], emptyParam];
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  });
  this.match = match2;
  return match2(method, path);
}

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = /* @__PURE__ */ new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) return b.length === 1 ? a < b ? -1 : 1 : -1;
  if (b.length === 1) return 1;
  if (a === ".*" || a === "(?:|/.*)") return b === "(?:|/.*)" ? -1 : 1;
  else if (b === ".*" || b === "(?:|/.*)") return -1;
  if (a === "[^/]+") return 1;
  else if (b === "[^/]+") return -1;
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class Node2 {
  #index;
  #varIndex;
  #children = createNullObject();
  insert(tokens, index, paramMap, context, isStatic) {
    let node = this;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];
      const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? [
        "",
        "",
        ".*"
      ] : [
        "",
        "",
        LABEL_REG_EXP_STR
      ] : null : token === "/*" ? [
        "",
        "",
        TAIL_WILDCARD_REG_EXP_STR
      ] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let nextNode;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || "[^/]+";
        if (name && pattern[2]) {
          if (regexpStr === ".*") throw PATH_ERROR;
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
          if (/\((?!\?:)/.test(regexpStr)) throw PATH_ERROR;
          if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) throw PATH_ERROR;
        }
        nextNode = node.#children[regexpStr];
        if (!nextNode) {
          if (regexpStr !== ".*" && regexpStr !== "(?:|/.*)") {
            for (const k2 in node.#children) if ((regexpStr.length > 1 || k2.length > 1) && k2 !== ".*" && k2 !== "(?:|/.*)") throw PATH_ERROR;
          }
          nextNode = node.#children[regexpStr] = new Node2();
        }
        if (name !== "") {
          nextNode.#varIndex ??= context.varIndex++;
          paramMap.push([name, nextNode.#varIndex]);
        }
      } else {
        nextNode = node.#children[token];
        if (!nextNode) {
          for (const k2 in node.#children) if (k2.length > 1 && k2 !== ".*" && k2 !== "(?:|/.*)") throw PATH_ERROR;
          nextNode = node.#children[token] = new Node2();
        }
      }
      node = nextNode;
    }
    if (node.#index !== void 0) throw PATH_ERROR;
    node.#index = isStatic ? -1 : index;
  }
  buildRegExpStr() {
    const strList = Object.keys(this.#children).sort(compareKey).map((k2) => {
      const c = this.#children[k2];
      const childStr = c.buildRegExpStr();
      return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k2})@${c.#varIndex}` : regExpMetaChars.has(k2) ? `\\${k2}` : k2) + childStr;
    }).filter(Boolean);
    if (typeof this.#index === "number" && this.#index !== -1) strList.unshift(`#${this.#index}`);
    if (strList.length === 0) return "";
    if (strList.length === 1) return strList[0];
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  #index = 0;
  paths = createNullObject();
  insert(path, isStatic) {
    if (isStatic) {
      this.#root.insert(path.split(""), 0, [], this.#context, true);
      return;
    }
    const paramAssoc = [];
    const groups = [];
    let markedPath = path;
    for (let i = 0; ; ) {
      let replaced = false;
      markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) break;
    }
    const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j2 = tokens.length - 1; j2 >= 0; j2--) if (tokens[j2].indexOf(mark) !== -1) {
        tokens[j2] = tokens[j2].replace(mark, groups[i][1]);
        break;
      }
    }
    this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
    this.paths[path] = [this.#index++, paramAssoc];
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") return [
      /^$/,
      [],
      []
    ];
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [
      new RegExp(`^${regexp}`),
      indexReplacementMap,
      paramReplacementMap
    ];
  }
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router/reg-exp-router/router.js
var wildcardRegExpCache = createNullObject();
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(`^${path.replace(/\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g, (match2, metaChar) => metaChar ? `\\${metaChar}` : match2 === "/*" ? TAIL_WILDCARD_REG_EXP_STR : match2 === "*" ? ".*" : `/:${LABEL_REG_EXP_STR}`)}$`);
}
function findMiddleware(middleware, path) {
  for (const k2 of Object.keys(middleware).sort((a, b) => b.length - a.length)) if (buildWildcardRegExp(k2).test(path)) return [...middleware[k2]];
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  #tries;
  constructor() {
    this.#middleware = { ["ALL"]: createNullObject() };
    this.#routes = { ["ALL"]: createNullObject() };
    this.#tries = { ["ALL"]: new Trie() };
  }
  #insertPath(method, path) {
    try {
      this.#tries[method].insert(path, !/\*|\/:/.test(path));
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
  }
  add(method, path, handler2) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware) throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    if (!middleware[method]) {
      this.#tries[method] = new Trie();
      for (const handlerMap of [middleware, routes]) {
        handlerMap[method] = createNullObject();
        for (const p in handlerMap["ALL"]) {
          handlerMap[method][p] = [...handlerMap["ALL"][p]];
          this.#insertPath(method, p);
        }
      }
    }
    if (path === "/*") path = "*";
    const methods = method === "ALL" ? Object.keys(middleware) : [method];
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      for (const m of methods) if (!middleware[m][path]) {
        this.#insertPath(m, path);
        middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware["ALL"], path) || [];
      }
      for (const handlerMap of [middleware, routes]) for (const m of methods) for (const p in handlerMap[m]) re.test(p) && handlerMap[m][p].push([handler2, path]);
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (const path2 of paths) for (const m of methods) {
      if (!routes[m][path2]) {
        this.#insertPath(m, path2);
        routes[m][path2] = findMiddleware(middleware[m], path2) || findMiddleware(middleware["ALL"], path2) || [];
      }
      routes[m][path2].push([handler2, path2]);
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = createNullObject();
    for (const method of Object.keys(this.#routes)) matchers[method] = this.#buildMatcher(method);
    this.#middleware = this.#routes = this.#tries = void 0;
    wildcardRegExpCache = createNullObject();
    return matchers;
  }
  #buildMatcher(method) {
    const middleware = this.#middleware[method];
    const routes = this.#routes[method];
    const trie = this.#tries[method];
    const staticMap = createNullObject();
    const handlerData = [];
    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (const r of [middleware, routes]) for (const path in r) {
      const handlers = r[path];
      const pathData = trie.paths[path];
      if (!pathData) {
        staticMap[path] = [handlers.map(([h]) => [h, createNullObject()]), emptyParam];
        continue;
      }
      handlerData[pathData[0]] = handlers.map(([h, handlerPath]) => [h, trie.paths[handlerPath][1].reduceRight((map, [key], i) => {
        map[key] = paramReplacementMap[pathData[1][i][1]];
        return map;
      }, createNullObject())]);
    }
    return [
      regexp,
      indexReplacementMap.map((i) => handlerData[i]),
      staticMap
    ];
  }
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler2) {
    if (!this.#routes) throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    this.#routes.push([
      method,
      path,
      handler2
    ]);
  }
  match(method, path) {
    if (!this.#routes) throw new Error("Fatal error");
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) router.add(...routes[i2]);
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) continue;
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) throw new Error("Fatal error");
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) throw new Error("No active router has been determined yet.");
    return this.#routers[0];
  }
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router/trie-router/node.js
var emptyParams = createNullObject();
var order = 0;
var Node3 = class Node4 {
  #methods = [];
  #children = createNullObject();
  #patterns = [];
  #pattern;
  #params = emptyParams;
  insert(method, path, handler2) {
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = /* @__PURE__ */ new Set();
    let i = 0;
    for (const p of parts) {
      const nextP = parts[++i];
      const pattern = getPattern(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
      const isParam = Array.isArray(pattern);
      const key = isParam ? pattern[0] : pattern || p;
      const child = curNode.#children[key] ||= new Node4();
      if (pattern && !child.#pattern) {
        child.#pattern = pattern;
        curNode.#patterns.push(child);
      }
      curNode = child;
      if (isParam) possibleKeys.add(pattern[1]);
    }
    curNode.#methods.push({ [method]: {
      handler: handler2,
      possibleKeys: [...possibleKeys],
      score: ++order
    } });
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m["ALL"];
      if (handlerSet) {
        handlerSet.params = createNullObject();
        handlerSets.push(handlerSet);
        for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
          const key = handlerSet.possibleKeys[i2];
          handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    let curNodes = [this];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j2 = 0, len2 = curNodes.length; j2 < len2; j2++) {
        const node = curNodes[j2];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else tempNodes.push(nextNode);
        }
        for (const child of node.#patterns) {
          const pattern = child.#pattern;
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (typeof pattern === "string") {
            if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
              this.#pushHandlerSets(handlerSets, child, method, node.#params);
              if (pattern === "*") {
                child.#params = params;
                tempNodes.push(child);
              }
            }
            continue;
          }
          const [, name, matcher] = pattern;
          if (!part && matcher === true) continue;
          if (matcher !== true) {
            if (!partOffsets) {
              partOffsets = [];
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.slice(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) this.#pushHandlerSets(handlerSets, child.#children["*"], method, node.#params, params);
              for (const _ in child.#children) {
                child.#params = params;
                const componentCount = m[0].match(/\//g)?.length ?? 0;
                (curNodesQueue[componentCount] ||= []).push(child);
                break;
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) this.#pushHandlerSets(handlerSets, child.#children["*"], method, params, node.#params);
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets[1]) handlerSets.sort((a, b) => {
      return a.score - b.score;
    });
    return [handlerSets.map(({ handler: handler2, params }) => [handler2, params])];
  }
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node = new Node3();
  add(method, path, handler2) {
    for (const result of checkOptionalParameter(path) || [path]) this.#node.insert(method, result, handler2);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/hono.js
var Hono3 = class extends Hono {
  /**
  * Creates an instance of the Hono class.
  *
  * @param options - Optional configuration options for the Hono instance.
  */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({ routers: [new RegExpRouter(), new TrieRouter()] });
  }
};

// node_modules/.pnpm/hono@4.13.13/node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const opts = {
    origin: "*",
    allowMethods: [
      "GET",
      "HEAD",
      "PUT",
      "POST",
      "DELETE",
      "PATCH",
      "QUERY"
    ],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const exposeHeadersStr = opts.exposeHeaders?.length ? opts.exposeHeaders.join(",") : void 0;
  const allowHeadersStr = opts.allowHeaders?.length ? opts.allowHeaders.join(",") : void 0;
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") return () => optsOrigin;
      else return (origin) => optsOrigin === origin ? origin : null;
    } else if (typeof optsOrigin === "function") return optsOrigin;
    else return (origin) => optsOrigin.includes(origin) ? origin : null;
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") return async (origin, c) => (await optsAllowMethods(origin, c)).join(",");
    else if (Array.isArray(optsAllowMethods)) {
      const methodsStr = optsAllowMethods.join(",");
      return () => methodsStr;
    } else return () => "";
  })(opts.allowMethods);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) set("Access-Control-Allow-Origin", allowOrigin);
    if (opts.credentials) set("Access-Control-Allow-Credentials", "true");
    if (exposeHeadersStr) set("Access-Control-Expose-Headers", exposeHeadersStr);
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") c.res.headers.append("Vary", "Origin");
      if (opts.maxAge != null) set("Access-Control-Max-Age", opts.maxAge.toString());
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods) set("Access-Control-Allow-Methods", allowMethods);
      let headersStr = allowHeadersStr;
      if (!headersStr) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) headersStr = requestHeaders.split(",").map((h) => h.trim()).join(",");
      }
      if (headersStr) {
        set("Access-Control-Allow-Headers", headersStr);
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") c.header("Vary", "Origin", { append: true });
  };
};

// apps/server/src/app.ts
var import_tldts = __toESM(require_cjs(), 1);

// packages/shared/dist/score.js
function calculateHealthScore(registration, dns, ssl, email, securityHeaders) {
  let score = 100;
  const penalties = [];
  const warnings = [];
  if (!ssl.is_valid) {
    score -= 40;
    penalties.push({
      code: "SSL_INVALID",
      label: "Certificado HTTPS inv\xE1lido o no disponible (-40)",
      deduction: 40,
      category: "ssl"
    });
    warnings.push({
      code: "SSL_INVALID",
      severity: "critical",
      message: ssl.error || "El sitio no cuenta con un certificado SSL/TLS v\xE1lido.",
      category: "ssl"
    });
  } else if (ssl.days_remaining !== null && ssl.days_remaining < 14) {
    score -= 15;
    penalties.push({
      code: "SSL_EXPIRING_CRITICAL",
      label: "Certificado SSL caduca en menos de 14 d\xEDas (-15)",
      deduction: 15,
      category: "ssl"
    });
    warnings.push({
      code: "SSL_EXPIRING_CRITICAL",
      severity: "high",
      message: `El certificado SSL caduca pronto (${ssl.days_remaining} d\xEDas restantes).`,
      category: "ssl"
    });
  } else if (ssl.days_remaining !== null && ssl.days_remaining < 45) {
    warnings.push({
      code: "SSL_EXPIRING_SOON",
      severity: "medium",
      message: `El certificado SSL caduca en ${ssl.days_remaining} d\xEDas.`,
      category: "ssl"
    });
  }
  if (registration.days_until_expiration !== null && registration.days_until_expiration < 30) {
    score -= 20;
    penalties.push({
      code: "DOMAIN_EXPIRING_SOON",
      label: "El registro del dominio vence en menos de 30 d\xEDas (-20)",
      deduction: 20,
      category: "registration"
    });
    warnings.push({
      code: "DOMAIN_EXPIRING_SOON",
      severity: "critical",
      message: `El dominio expira en ${registration.days_until_expiration} d\xEDas. Renueva urgentemente con tu registrador.`,
      category: "registration"
    });
  }
  if (!email.dmarc.configured || !email.dmarc.policy) {
    score -= 15;
    penalties.push({
      code: "DMARC_MISSING",
      label: "Sin pol\xEDtica DMARC configurada (-15)",
      deduction: 15,
      category: "email"
    });
    warnings.push({
      code: "DMARC_MISSING",
      severity: "high",
      message: "No se detect\xF3 registro DMARC (_dmarc). El dominio es vulnerable a spoofing.",
      category: "email"
    });
  } else if (email.dmarc.policy === "none") {
    score -= 5;
    penalties.push({
      code: "DMARC_PERMISSIVE",
      label: "Pol\xEDtica DMARC en modo permisivo (p=none) (-5)",
      deduction: 5,
      category: "email"
    });
    warnings.push({
      code: "DMARC_PERMISSIVE",
      severity: "medium",
      message: "La pol\xEDtica DMARC est\xE1 configurada como p=none (solo monitoreo). Se recomienda p=quarantine o p=reject.",
      category: "email"
    });
  }
  if (!email.spf.configured || !email.spf.raw) {
    score -= 10;
    penalties.push({
      code: "SPF_MISSING",
      label: "Sin registro SPF configurado (-10)",
      deduction: 10,
      category: "email"
    });
    warnings.push({
      code: "SPF_MISSING",
      severity: "high",
      message: "Falta el registro TXT SPF (v=spf1). Los servidores de correo pueden rechazar env\xEDos.",
      category: "email"
    });
  } else if (email.spf.lookup_limit_exceeded) {
    score -= 10;
    penalties.push({
      code: "SPF_LOOKUP_LIMIT",
      label: "L\xEDmite de 10 DNS lookups en SPF superado (-10)",
      deduction: 10,
      category: "email"
    });
    warnings.push({
      code: "SPF_LOOKUP_LIMIT",
      severity: "critical",
      message: `El registro SPF contiene ${email.spf.lookup_count} b\xFAsquedas DNS (m\xE1ximo permitido: 10 seg\xFAn RFC 7208). Esto causar\xE1 fallos PermError.`,
      category: "email"
    });
  } else if (email.spf.strictness === "neutral" || email.spf.strictness === "none") {
    warnings.push({
      code: "SPF_WEAK",
      severity: "medium",
      message: "El registro SPF tiene una directiva final d\xE9bil (?all o +all). Usa ~all o -all.",
      category: "email"
    });
  }
  if (!dns.has_ipv6 || dns.aaaa_records.length === 0) {
    score -= 5;
    penalties.push({
      code: "NO_IPV6",
      label: "Sin registros AAAA (IPv6) configurados (-5)",
      deduction: 5,
      category: "dns"
    });
    warnings.push({
      code: "NO_IPV6",
      severity: "low",
      message: "No se detect\xF3 soporte para IPv6 (sin registros AAAA).",
      category: "dns"
    });
  }
  if (!ssl.hsts_enabled) {
    score -= 5;
    penalties.push({
      code: "HSTS_DISABLED",
      label: "Cabecera HSTS ausente (-5)",
      deduction: 5,
      category: "ssl"
    });
    warnings.push({
      code: "HSTS_DISABLED",
      severity: "low",
      message: "No se encontr\xF3 la cabecera HTTP Strict-Transport-Security.",
      category: "ssl"
    });
  }
  if (!dns.dnssec?.enabled) {
    warnings.push({
      code: "DNSSEC_DISABLED",
      severity: "low",
      message: "DNSSEC no est\xE1 habilitado en este dominio. El tr\xE1fico DNS no est\xE1 firmado criptogr\xE1ficamente.",
      category: "dns"
    });
  }
  if (!dns.caa?.configured) {
    warnings.push({
      code: "CAA_MISSING",
      severity: "low",
      message: "Sin registros CAA configurados. Cualquier CA p\xFAblica puede emitir certificados para este dominio.",
      category: "dns"
    });
  }
  if (securityHeaders) {
    if (!securityHeaders.csp) {
      warnings.push({
        code: "CSP_MISSING",
        severity: "medium",
        message: "Cabecera Content-Security-Policy (CSP) ausente. Recomendada para mitigar ataques XSS.",
        category: "security"
      });
    }
    if (!securityHeaders.x_frame_options) {
      warnings.push({
        code: "X_FRAME_OPTIONS_MISSING",
        severity: "medium",
        message: "Cabecera X-Frame-Options ausente. El sitio podr\xEDa ser embebido en iframes no autorizados (Clickjacking).",
        category: "security"
      });
    }
    if (!securityHeaders.http_redirects_to_https) {
      warnings.push({
        code: "HTTP_NOT_REDIRECTED",
        severity: "medium",
        message: "El puerto 80 (HTTP) no redirige autom\xE1ticamente a HTTPS.",
        category: "security"
      });
    }
  }
  const finalScore = Math.max(0, Math.min(100, score));
  let grade = "optimal";
  if (finalScore < 60) {
    grade = "critical";
  } else if (finalScore < 85) {
    grade = "warning";
  }
  return {
    score: finalScore,
    grade,
    penalties,
    warnings
  };
}

// apps/server/src/services/doh.ts
var CLOUDFLARE_DOH = "https://cloudflare-dns.com/dns-query";
async function queryDohFull(name, type) {
  const url = `${CLOUDFLARE_DOH}?name=${encodeURIComponent(name)}&type=${type}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4e3);
    const res = await fetch(url, {
      headers: {
        accept: "application/dns-json"
      },
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!res.ok) {
      return { answers: [], adFlag: false };
    }
    const data = await res.json();
    return {
      answers: data.Answer || [],
      adFlag: !!data.AD
    };
  } catch (err) {
    return { answers: [], adFlag: false };
  }
}
async function queryDoh(name, type) {
  const res = await queryDohFull(name, type);
  return res.answers;
}
var cleanTxt = (data) => {
  return data.replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"').trim();
};
async function fetchAllDnsRecords(domain) {
  const [
    aRes,
    aaaaRes,
    mxRes,
    txtRes,
    dmarcRes,
    mtaStsRes,
    bimiRes,
    nsRes,
    dsFullRes,
    caaRes
  ] = await Promise.all([
    queryDoh(domain, "A"),
    queryDoh(domain, "AAAA"),
    queryDoh(domain, "MX"),
    queryDoh(domain, "TXT"),
    queryDoh(`_dmarc.${domain}`, "TXT"),
    queryDoh(`_mta-sts.${domain}`, "TXT"),
    queryDoh(`default._bimi.${domain}`, "TXT"),
    queryDoh(domain, "NS"),
    queryDohFull(domain, "DS"),
    queryDoh(domain, "CAA")
  ]);
  const a_records = aRes.filter((ans) => ans.type === 1).map((ans) => ans.data.trim());
  const aaaa_records = aaaaRes.filter((ans) => ans.type === 28).map((ans) => ans.data.trim());
  const mx_records = mxRes.filter((ans) => ans.type === 15).map((ans) => {
    const parts = ans.data.trim().split(/\s+/);
    const priority = parseInt(parts[0], 10) || 10;
    const host = (parts[1] || "").replace(/\.$/, "");
    return { priority, host };
  }).sort((a, b) => a.priority - b.priority);
  const txt_records = txtRes.filter((ans) => ans.type === 16).map((ans) => cleanTxt(ans.data));
  const dmarc_txt_records = dmarcRes.filter((ans) => ans.type === 16).map((ans) => cleanTxt(ans.data));
  const mta_sts_txt_records = mtaStsRes.filter((ans) => ans.type === 16).map((ans) => cleanTxt(ans.data));
  const bimi_txt_records = bimiRes.filter((ans) => ans.type === 16).map((ans) => cleanTxt(ans.data));
  const nameservers = nsRes.filter((ans) => ans.type === 2).map((ans) => ans.data.replace(/\.$/, "").toLowerCase().trim());
  const dnssec_ds_records = dsFullRes.answers.filter((ans) => ans.type === 43).map((ans) => ans.data.trim());
  const caa_records = caaRes.filter((ans) => ans.type === 257).map((ans) => cleanTxt(ans.data));
  return {
    a_records,
    aaaa_records,
    mx_records,
    txt_records,
    dmarc_txt_records,
    mta_sts_txt_records,
    bimi_txt_records,
    nameservers,
    dnssec_ds_records,
    dnssec_ad_flag: dsFullRes.adFlag,
    caa_records
  };
}

// apps/server/src/services/subdomains.ts
var HIGH_VALUE_PREFIXES = [
  "admin",
  "api",
  "app",
  "auth",
  "blog",
  "cdn",
  "dashboard",
  "dev",
  "docs",
  "mail",
  "portal",
  "staging",
  "status",
  "vpn",
  "www"
];
async function discoverRealSubdomains(domain, sanDomains = []) {
  const subdomainsMap = /* @__PURE__ */ new Map();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`https://api.hackertarget.com/hostsearch/?q=${encodeURIComponent(domain)}`, {
      headers: {
        "User-Agent": "DomainPulse/1.0",
        Accept: "text/plain"
      },
      signal: controller.signal
    });
    clearTimeout(timer);
    if (res.ok) {
      const text = await res.text();
      if (!text.includes("error") && !text.includes("API count exceeded") && !text.includes("No records")) {
        const lines = text.trim().split("\n");
        for (const line of lines) {
          const parts = line.split(",");
          const host = (parts[0] || "").toLowerCase().trim();
          const ip = (parts[1] || "").trim();
          if (host && host.endsWith(`.${domain}`) && host !== domain) {
            subdomainsMap.set(host, {
              subdomain: host,
              active: !!ip,
              ip: ip || null
            });
          }
        }
      }
    }
  } catch {
  }
  for (const san of sanDomains) {
    const cleanSan = san.toLowerCase().trim();
    if (cleanSan.endsWith(`.${domain}`) && cleanSan !== domain && !cleanSan.includes("*")) {
      if (!subdomainsMap.has(cleanSan)) {
        subdomainsMap.set(cleanSan, {
          subdomain: cleanSan,
          active: false
          // will resolve below
        });
      }
    }
  }
  for (const prefix of HIGH_VALUE_PREFIXES) {
    const full = `${prefix}.${domain}`;
    if (!subdomainsMap.has(full)) {
      subdomainsMap.set(full, {
        subdomain: full,
        active: false
      });
    }
  }
  const toResolve = Array.from(subdomainsMap.values()).filter((s) => !s.ip).slice(0, 25);
  await Promise.all(
    toResolve.map(async (item) => {
      try {
        const answers = await queryDoh(item.subdomain, "A");
        const aRec = answers.find((ans) => ans.type === 1);
        const cnameRec = answers.find((ans) => ans.type === 5);
        if (aRec) {
          item.active = true;
          item.ip = aRec.data.trim();
          if (cnameRec) {
            item.cname = cnameRec.data.replace(/\.$/, "");
          }
        } else if (cnameRec) {
          item.active = true;
          item.cname = cnameRec.data.replace(/\.$/, "");
        }
      } catch {
      }
    })
  );
  const results = Array.from(subdomainsMap.values());
  results.sort((a, b) => {
    if (a.active !== b.active) return a.active ? -1 : 1;
    return a.subdomain.localeCompare(b.subdomain);
  });
  return results.slice(0, 40);
}

// apps/server/src/services/rdap.ts
function extractRegistrarName(entities) {
  if (!entities || !Array.isArray(entities)) return null;
  for (const entity of entities) {
    if (entity.roles && entity.roles.includes("registrar")) {
      if (Array.isArray(entity.vcardArray) && entity.vcardArray[1]) {
        const vcardProps = entity.vcardArray[1];
        for (const prop of vcardProps) {
          if (Array.isArray(prop) && prop[0] === "fn" && typeof prop[3] === "string") {
            return prop[3];
          }
        }
      }
      if (entity.handle) {
        return entity.handle;
      }
    }
    if (entity.entities) {
      const nested = extractRegistrarName(entity.entities);
      if (nested) return nested;
    }
  }
  return null;
}
async function fetchRdapInfo(domain, fallbackNameservers = []) {
  const url = `https://rdap.org/domain/${encodeURIComponent(domain)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(url, {
      headers: {
        accept: "application/rdap+json, application/json"
      },
      signal: controller.signal
    });
    clearTimeout(timer);
    if (!res.ok) {
      return buildFallbackRegistration(fallbackNameservers);
    }
    const data = await res.json();
    let created_at = null;
    let expires_at = null;
    if (Array.isArray(data.events)) {
      for (const ev of data.events) {
        if (ev.eventAction === "registration") {
          created_at = ev.eventDate || null;
        } else if (ev.eventAction === "expiration") {
          expires_at = ev.eventDate || null;
        }
      }
    }
    let days_until_expiration = null;
    if (expires_at) {
      const expTime = new Date(expires_at).getTime();
      const now = Date.now();
      days_until_expiration = Math.max(0, Math.round((expTime - now) / (1e3 * 60 * 60 * 24)));
    }
    const registrar = extractRegistrarName(data.entities);
    const nameservers = [];
    if (Array.isArray(data.nameservers)) {
      for (const ns of data.nameservers) {
        if (ns.ldhName) {
          nameservers.push(ns.ldhName.toLowerCase());
        }
      }
    }
    const status = Array.isArray(data.status) && data.status.length > 0 ? data.status[0] : "active";
    return {
      registrar: registrar || "Registrador Privado / ICANN Protegido",
      created_at,
      expires_at,
      days_until_expiration,
      status,
      nameservers: nameservers.length > 0 ? nameservers : fallbackNameservers
    };
  } catch (err) {
    return buildFallbackRegistration(fallbackNameservers);
  }
}
function buildFallbackRegistration(nameservers) {
  return {
    registrar: "Consultado v\xEDa DNS / Whois Privado",
    created_at: null,
    expires_at: null,
    days_until_expiration: null,
    status: "active",
    nameservers
  };
}

// apps/server/src/services/tls.ts
var tls = __toESM(require("node:tls"), 1);
async function inspectTls(domain, timeoutMs = 4e3) {
  return new Promise((resolve) => {
    let resolved = false;
    const cleanup = (info) => {
      if (!resolved) {
        resolved = true;
        resolve(info);
      }
    };
    try {
      const socket = tls.connect(
        {
          host: domain,
          port: 443,
          servername: domain,
          rejectUnauthorized: false,
          timeout: timeoutMs
        },
        () => {
          try {
            const cert = socket.getPeerCertificate(false);
            const tls_version = socket.getProtocol();
            const authorized = socket.authorized;
            const authError = socket.authorizationError ? String(socket.authorizationError) : null;
            socket.end();
            if (!cert || Object.keys(cert).length === 0) {
              cleanup({
                issuer: null,
                valid_from: null,
                valid_to: null,
                days_remaining: null,
                tls_version: tls_version || null,
                hsts_enabled: false,
                is_valid: false,
                error: "No se pudo obtener el certificado del servidor TLS.",
                san_domains: []
              });
              return;
            }
            const issuerRaw = cert.issuer ? cert.issuer.O || cert.issuer.CN : null;
            const issuer = Array.isArray(issuerRaw) ? issuerRaw.join(", ") : issuerRaw || "Emisor desconocido";
            const valid_from = cert.valid_from ? new Date(cert.valid_from).toISOString() : null;
            const valid_to = cert.valid_to ? new Date(cert.valid_to).toISOString() : null;
            let days_remaining = null;
            if (valid_to) {
              const expTime = new Date(valid_to).getTime();
              days_remaining = Math.round((expTime - Date.now()) / (1e3 * 60 * 60 * 24));
            }
            const isExpired = days_remaining !== null && days_remaining < 0;
            const is_valid = authorized && !isExpired;
            const san_domains = [];
            if (cert.subjectaltname && typeof cert.subjectaltname === "string") {
              const parts = cert.subjectaltname.split(", ");
              for (const part of parts) {
                if (part.startsWith("DNS:")) {
                  const name = part.slice(4).trim().toLowerCase();
                  san_domains.push(name);
                }
              }
            }
            cleanup({
              issuer,
              valid_from,
              valid_to,
              days_remaining,
              tls_version: tls_version || "TLSv1.2",
              hsts_enabled: false,
              is_valid,
              error: !is_valid ? isExpired ? "El certificado SSL ha caducado." : authError || "Certificado no confiable o no emitido por una CA ra\xEDz v\xE1lida." : null,
              san_domains
            });
          } catch (err) {
            cleanup({
              issuer: null,
              valid_from: null,
              valid_to: null,
              days_remaining: null,
              tls_version: null,
              hsts_enabled: false,
              is_valid: false,
              error: err?.message || "Error al inspeccionar certificado TLS",
              san_domains: []
            });
          }
        }
      );
      socket.on("timeout", () => {
        socket.destroy();
        cleanup({
          issuer: null,
          valid_from: null,
          valid_to: null,
          days_remaining: null,
          tls_version: null,
          hsts_enabled: false,
          is_valid: false,
          error: "Tiempo de espera agotado al conectar al puerto 443.",
          san_domains: []
        });
      });
      socket.on("error", (err) => {
        socket.destroy();
        cleanup({
          issuer: null,
          valid_from: null,
          valid_to: null,
          days_remaining: null,
          tls_version: null,
          hsts_enabled: false,
          is_valid: false,
          error: `Error de conexi\xF3n TLS: ${err.message}`,
          san_domains: []
        });
      });
    } catch (err) {
      cleanup({
        issuer: null,
        valid_from: null,
        valid_to: null,
        days_remaining: null,
        tls_version: null,
        hsts_enabled: false,
        is_valid: false,
        error: err?.message || "Fallo general al iniciar handshake TLS",
        san_domains: []
      });
    }
  });
}

// apps/server/src/services/http-probe.ts
async function probeHttpAndTech(domain, timeoutMs = 4e3) {
  const [redirectResult, httpsResult] = await Promise.allSettled([
    checkHttpRedirect(domain, timeoutMs),
    inspectHttpsAndHtml(domain, timeoutMs)
  ]);
  const redirectsToHttps = redirectResult.status === "fulfilled" ? redirectResult.value : false;
  const httpsData = httpsResult.status === "fulfilled" ? httpsResult.value : {
    headers: {},
    html: "",
    hsts: false,
    csp: false,
    xFrame: false,
    xContentType: false,
    referrerPolicy: false,
    permissionsPolicy: false
  };
  const totalHeaders = 6;
  const countPresent = [
    httpsData.hsts,
    httpsData.csp,
    httpsData.xFrame,
    httpsData.xContentType,
    httpsData.referrerPolicy,
    httpsData.permissionsPolicy
  ].filter(Boolean).length;
  const score_percentage = Math.round(countPresent / totalHeaders * 100);
  const security_headers = {
    hsts: httpsData.hsts,
    csp: httpsData.csp,
    x_frame_options: httpsData.xFrame,
    x_content_type_options: httpsData.xContentType,
    referrer_policy: httpsData.referrerPolicy,
    permissions_policy: httpsData.permissionsPolicy,
    http_redirects_to_https: redirectsToHttps,
    score_percentage
  };
  const tech_stack = analyzeTechStack(httpsData.headers, httpsData.html);
  return {
    security_headers,
    tech_stack,
    hsts_enabled: httpsData.hsts
  };
}
async function checkHttpRedirect(domain, timeoutMs) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(`http://${domain}`, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal
    });
    clearTimeout(timer);
    const loc = res.headers.get("location") || "";
    const status = res.status;
    return (status === 301 || status === 302 || status === 307 || status === 308) && loc.startsWith("https://");
  } catch {
    return false;
  }
}
async function inspectHttpsAndHtml(domain, timeoutMs) {
  const url = `https://${domain}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const headersMap = {};
  let html = "";
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 DomainPulse/1.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      },
      redirect: "follow",
      signal: controller.signal
    });
    clearTimeout(timer);
    res.headers.forEach((val, key) => {
      headersMap[key.toLowerCase()] = val;
    });
    const reader = res.body?.getReader();
    if (reader) {
      let bytesRead = 0;
      const chunks = [];
      while (bytesRead < 65536) {
        const { done, value } = await reader.read();
        if (done || !value) break;
        chunks.push(value);
        bytesRead += value.length;
      }
      reader.cancel().catch(() => {
      });
      const totalBuffer = new Uint8Array(bytesRead);
      let offset = 0;
      for (const chunk of chunks) {
        totalBuffer.set(chunk, offset);
        offset += chunk.length;
      }
      html = new TextDecoder("utf-8", { fatal: false }).decode(totalBuffer);
    }
  } catch {
  }
  const hsts = !!headersMap["strict-transport-security"];
  const csp = !!headersMap["content-security-policy"];
  const xFrame = !!headersMap["x-frame-options"];
  const xContentType = headersMap["x-content-type-options"] === "nosniff";
  const referrerPolicy = !!headersMap["referrer-policy"];
  const permissionsPolicy = !!headersMap["permissions-policy"] || !!headersMap["feature-policy"];
  return {
    headers: headersMap,
    html,
    hsts,
    csp,
    xFrame,
    xContentType,
    referrerPolicy,
    permissionsPolicy
  };
}
function analyzeTechStack(headers, html) {
  const detected = /* @__PURE__ */ new Set();
  let server = null;
  let framework = null;
  let cms = null;
  let ui = null;
  let cdn = null;
  const analytics = [];
  const serverHeader = headers["server"];
  if (serverHeader) {
    server = serverHeader;
    if (/cloudflare/i.test(serverHeader)) {
      cdn = "Cloudflare";
      detected.add("Cloudflare");
    } else if (/nginx/i.test(serverHeader)) {
      detected.add("Nginx");
    } else if (/apache/i.test(serverHeader)) {
      detected.add("Apache");
    } else if (/caddy/i.test(serverHeader)) {
      detected.add("Caddy");
    } else if (/litespeed/i.test(serverHeader)) {
      detected.add("LiteSpeed");
    } else if (/microsoft-iis/i.test(serverHeader)) {
      detected.add("Microsoft IIS");
    }
  }
  if (headers["x-vercel-id"] || headers["x-vercel-cache"]) {
    cdn = "Vercel";
    framework = framework || "Next.js";
    detected.add("Vercel");
    detected.add("Next.js");
  }
  if (headers["x-amz-cf-id"] || headers["x-amz-cf-pop"]) {
    cdn = "AWS CloudFront";
    detected.add("AWS CloudFront");
  }
  if (headers["x-fastly-request-id"] || headers["fastly-debug-digest"]) {
    cdn = "Fastly";
    detected.add("Fastly");
  }
  if (headers["x-nf-request-id"]) {
    cdn = "Netlify";
    detected.add("Netlify");
  }
  const poweredBy = headers["x-powered-by"];
  if (poweredBy) {
    if (/next\.js/i.test(poweredBy)) {
      framework = "Next.js";
      detected.add("Next.js");
    } else if (/express/i.test(poweredBy)) {
      framework = "Express.js";
      detected.add("Express.js");
      detected.add("Node.js");
    } else if (/php/i.test(poweredBy)) {
      framework = "PHP";
      detected.add("PHP");
    } else if (/asp\.net/i.test(poweredBy)) {
      framework = "ASP.NET";
      detected.add("ASP.NET");
    }
  }
  const cookieHeader = headers["set-cookie"] || "";
  if (/phpsessid/i.test(cookieHeader)) {
    detected.add("PHP");
  }
  if (/laravel_session/i.test(cookieHeader)) {
    framework = "Laravel";
    detected.add("Laravel");
    detected.add("PHP");
  }
  if (/csrftoken/i.test(cookieHeader)) {
    detected.add("Django / Python");
  }
  if (/connect\.sid/i.test(cookieHeader)) {
    detected.add("Node.js");
  }
  if (html) {
    const metaGenMatch = html.match(/<meta\s+name=["']generator["']\s+content=["']([^"']+)["']/i);
    if (metaGenMatch) {
      const gen = metaGenMatch[1];
      if (/wordpress/i.test(gen)) {
        cms = "WordPress";
        detected.add("WordPress");
      } else if (/webflow/i.test(gen)) {
        cms = "Webflow";
        detected.add("Webflow");
      } else if (/shopify/i.test(gen)) {
        cms = "Shopify";
        detected.add("Shopify");
      } else if (/ghost/i.test(gen)) {
        cms = "Ghost";
        detected.add("Ghost");
      } else if (/drupal/i.test(gen)) {
        cms = "Drupal";
        detected.add("Drupal");
      } else if (/astro/i.test(gen)) {
        framework = "Astro";
        detected.add("Astro");
      } else if (/docusaurus/i.test(gen)) {
        framework = "Docusaurus";
        detected.add("Docusaurus");
      } else if (/hugo/i.test(gen)) {
        framework = "Hugo";
        detected.add("Hugo");
      } else if (/gatsby/i.test(gen)) {
        framework = "Gatsby";
        detected.add("Gatsby");
      }
    }
    if (html.includes("__NEXT_DATA__") || html.includes("/_next/")) {
      framework = "Next.js";
      ui = ui || "React";
      detected.add("Next.js");
      detected.add("React");
    }
    if (html.includes("__NUXT__") || html.includes("/_nuxt/")) {
      framework = "Nuxt.js";
      ui = ui || "Vue.js";
      detected.add("Nuxt.js");
      detected.add("Vue.js");
    }
    if (html.includes("__sveltekit") || html.includes("/_app/immutable/")) {
      framework = "SvelteKit";
      ui = "Svelte";
      detected.add("SvelteKit");
      detected.add("Svelte");
    }
    if (html.includes("react") && !detected.has("React")) {
      if (html.includes("data-reactroot") || html.includes("react-dom")) {
        ui = "React";
        detected.add("React");
      }
    }
    if (html.includes("data-v-") && !detected.has("Vue.js")) {
      ui = "Vue.js";
      detected.add("Vue.js");
    }
    if (html.includes("/wp-content/") || html.includes("/wp-includes/")) {
      cms = "WordPress";
      detected.add("WordPress");
      detected.add("PHP");
    }
    if (html.includes("cdn.shopify.com") || html.includes("window.Shopify")) {
      cms = "Shopify";
      detected.add("Shopify");
    }
    if (html.includes("data-wf-page") || html.includes("uploads-ssl.webflow.com")) {
      cms = "Webflow";
      detected.add("Webflow");
    }
    if (html.includes("tailwind") || /class="[^"]*(?:flex|grid|px-|py-|text-|bg-|rounded-)[^"]*"/i.test(html)) {
      detected.add("Tailwind CSS");
    }
    if (html.includes("googletagmanager.com") || html.includes("google-analytics.com")) {
      analytics.push("Google Analytics");
      detected.add("Google Analytics");
    }
    if (html.includes("posthog")) {
      analytics.push("PostHog");
      detected.add("PostHog");
    }
    if (html.includes("hotjar.com")) {
      analytics.push("Hotjar");
      detected.add("Hotjar");
    }
    if (html.includes("segment.com") || html.includes("analytics.js")) {
      analytics.push("Segment");
      detected.add("Segment");
    }
    if (html.includes("intercom.io")) {
      analytics.push("Intercom");
      detected.add("Intercom");
    }
    if (html.includes("cloudflareinsights.com") || html.includes("/cdn-cgi/rum")) {
      analytics.push("Cloudflare Analytics");
    }
  }
  if (!framework && detected.has("Next.js")) framework = "Next.js";
  if (!framework && detected.has("Nuxt.js")) framework = "Nuxt.js";
  if (!framework && detected.has("WordPress")) framework = "WordPress (PHP)";
  if (!ui && detected.has("React")) ui = "React";
  if (!ui && detected.has("Vue.js")) ui = "Vue.js";
  if (!ui && detected.has("Tailwind CSS")) ui = ui ? `${ui} + Tailwind` : "Tailwind CSS";
  return {
    server,
    framework,
    cms,
    ui,
    analytics,
    cdn,
    detected: Array.from(detected)
  };
}

// apps/server/src/services/providers.ts
function detectDnsProvider(a_records, nameservers) {
  const nsString = nameservers.join(" ").toLowerCase();
  if (nsString.includes("cloudflare.com")) return "Cloudflare";
  if (nsString.includes("awsdns") || nsString.includes("amazon") || nsString.includes("route53")) return "AWS Route 53";
  if (nsString.includes("google") || nsString.includes("googledomains")) return "Google Cloud DNS";
  if (nsString.includes("azure") || nsString.includes("microsoft")) return "Microsoft Azure";
  if (nsString.includes("digitalocean.com")) return "DigitalOcean";
  if (nsString.includes("vercel-dns.com")) return "Vercel";
  if (nsString.includes("nsone.net")) return "NS1";
  if (nsString.includes("dnsimple.com")) return "DNSimple";
  if (nsString.includes("namecheap.com")) return "Namecheap";
  if (nsString.includes("godaddy.com") || nsString.includes("domaincontrol.com")) return "GoDaddy";
  if (nsString.includes("ovh.net") || nsString.includes("ovh.com")) return "OVHcloud";
  if (nsString.includes("linode.com") || nsString.includes("akamai")) return "Akamai / Linode";
  for (const ip of a_records) {
    if (ip.startsWith("104.16.") || ip.startsWith("104.17.") || ip.startsWith("104.18.") || ip.startsWith("104.19.") || ip.startsWith("104.20.") || ip.startsWith("104.21.") || ip.startsWith("172.67.") || ip.startsWith("172.64.")) {
      return "Cloudflare";
    }
    if (ip === "76.76.21.21") return "Vercel";
    if (ip.startsWith("185.199.")) return "GitHub Pages";
    if (ip.startsWith("151.101.")) return "Fastly";
    if (ip.startsWith("199.60.103.") || ip.startsWith("198.49.23.")) return "Squarespace";
    if (ip.startsWith("35.") || ip.startsWith("34.")) return "Google Cloud";
    if (ip.startsWith("52.") || ip.startsWith("54.") || ip.startsWith("13.") || ip.startsWith("18.")) return "AWS Cloud";
    if (ip.startsWith("157.245.") || ip.startsWith("167.99.") || ip.startsWith("138.68.")) return "DigitalOcean";
    if (ip.startsWith("75.2.60.") || ip.startsWith("99.83.231.")) return "Netlify";
  }
  if (nameservers.length > 0) {
    const firstNs = nameservers[0];
    const match2 = firstNs.match(/([a-z0-9-]+\.[a-z]+)$/i);
    if (match2) return match2[1];
  }
  return "Hosting Independiente";
}
function detectEmailProvider(mxRecords) {
  if (mxRecords.length === 0) return "Sin correo configurado";
  const hosts = mxRecords.map((r) => r.host.toLowerCase()).join(" ");
  if (hosts.includes("google") || hosts.includes("aspmx") || hosts.includes("googlemail")) {
    return "Google Workspace";
  }
  if (hosts.includes("outlook.com") || hosts.includes("protection.outlook.com") || hosts.includes("office365")) {
    return "Microsoft 365";
  }
  if (hosts.includes("protonmail") || hosts.includes("proton.me")) {
    return "Proton Mail";
  }
  if (hosts.includes("messagingengine.com") || hosts.includes("fastmail.com")) {
    return "Fastmail";
  }
  if (hosts.includes("zoho.com") || hosts.includes("zoho.eu")) {
    return "Zoho Mail";
  }
  if (hosts.includes("mail.me.com") || hosts.includes("icloud.com")) {
    return "iCloud Mail";
  }
  if (hosts.includes("mailgun.org")) {
    return "Mailgun";
  }
  if (hosts.includes("sendgrid.net")) {
    return "SendGrid";
  }
  if (hosts.includes("pphosted.com")) {
    return "Proofpoint";
  }
  if (hosts.includes("mimecast.com")) {
    return "Mimecast";
  }
  if (hosts.includes("barracudanetworks.com")) {
    return "Barracuda";
  }
  const primary = mxRecords[0].host;
  return `Servidor Propio (${primary})`;
}
function parseSpf(txtRecords) {
  const spfRecord = txtRecords.find((txt) => txt.toLowerCase().startsWith("v=spf1"));
  if (!spfRecord) {
    return {
      configured: false,
      raw: null,
      strictness: null,
      lookup_count: 0,
      lookup_limit_exceeded: false
    };
  }
  const lower = spfRecord.toLowerCase();
  let strictness = "none";
  if (lower.includes("-all")) {
    strictness = "hardfail";
  } else if (lower.includes("~all")) {
    strictness = "softfail";
  } else if (lower.includes("?all")) {
    strictness = "neutral";
  } else if (lower.includes("+all")) {
    strictness = "none";
  }
  let lookup_count = 0;
  const tokens = spfRecord.split(/\s+/);
  for (const token of tokens) {
    const t = token.toLowerCase();
    if (t.startsWith("include:") || t.startsWith("a:") || t === "a" || t.startsWith("mx:") || t === "mx" || t.startsWith("ptr") || t.startsWith("exists:") || t.startsWith("redirect=")) {
      lookup_count += 1;
    }
  }
  return {
    configured: true,
    raw: spfRecord,
    strictness,
    lookup_count,
    lookup_limit_exceeded: lookup_count > 10
  };
}
function parseDmarc(dmarcTxtRecords, rootTxtRecords) {
  let dmarcRecord = dmarcTxtRecords.find((txt) => txt.toUpperCase().startsWith("V=DMARC1"));
  if (!dmarcRecord) {
    dmarcRecord = rootTxtRecords.find((txt) => txt.toUpperCase().startsWith("V=DMARC1"));
  }
  if (!dmarcRecord) {
    return {
      configured: false,
      raw: null,
      policy: null
    };
  }
  const policyMatch = dmarcRecord.match(/p=([a-z0-9_-]+)/i);
  let policy = null;
  if (policyMatch) {
    const val = policyMatch[1].toLowerCase();
    if (val === "reject") policy = "reject";
    else if (val === "quarantine") policy = "quarantine";
    else if (val === "none") policy = "none";
  }
  return {
    configured: true,
    raw: dmarcRecord,
    policy
  };
}
function parseMtaSts(mtaStsTxtRecords) {
  const rec = mtaStsTxtRecords.find((txt) => txt.toLowerCase().startsWith("v=stsv1"));
  if (!rec) {
    return {
      configured: false,
      raw: null,
      mode: null
    };
  }
  const modeMatch = rec.match(/mode=([a-z]+)/i);
  let mode = null;
  if (modeMatch) {
    const val = modeMatch[1].toLowerCase();
    if (val === "enforce") mode = "enforce";
    else if (val === "testing") mode = "testing";
    else if (val === "none") mode = "none";
  }
  return {
    configured: true,
    raw: rec,
    mode
  };
}
function parseBimi(bimiTxtRecords) {
  const rec = bimiTxtRecords.find((txt) => txt.toLowerCase().startsWith("v=bimi1"));
  if (!rec) {
    return {
      configured: false,
      raw: null
    };
  }
  return {
    configured: true,
    raw: rec
  };
}

// node_modules/.pnpm/lru-cache@11.5.3/node_modules/lru-cache/dist/esm/node/index.min.js
var import_node_diagnostics_channel = require("node:diagnostics_channel");
var S = (0, import_node_diagnostics_channel.channel)("lru-cache:metrics");
var W = (0, import_node_diagnostics_channel.tracingChannel)("lru-cache");
var L = typeof performance == "object" && performance && typeof performance.now == "function" ? performance : Date;
var R = () => S.hasSubscribers || W.hasSubscribers;
var U = /* @__PURE__ */ new Set();
var M = typeof process == "object" && process ? process : {};
var k = (d3, e, t, i) => {
  typeof M.emitWarning == "function" ? M.emitWarning(d3, e, t, i) : console.error(`[${t}] ${e}: ${d3}`);
};
var H = (d3) => !U.has(d3);
var T = (d3) => !!d3 && d3 === Math.floor(d3) && d3 > 0 && isFinite(d3);
var j = (d3) => T(d3) ? d3 <= Math.pow(2, 8) ? Uint8Array : d3 <= Math.pow(2, 16) ? Uint16Array : d3 <= Math.pow(2, 32) ? Uint32Array : d3 <= Number.MAX_SAFE_INTEGER ? O : null : null;
var O = class extends Array {
  constructor(e) {
    super(e), this.fill(0);
  }
};
var x = class d {
  heap;
  length;
  static #o = false;
  static create(e) {
    let t = j(e);
    if (!t) return [];
    d.#o = true;
    let i = new d(e, t);
    return d.#o = false, i;
  }
  constructor(e, t) {
    if (!d.#o) throw new TypeError("instantiate Stack using Stack.create(n)");
    this.heap = new t(e), this.length = 0;
  }
  push(e) {
    this.heap[this.length++] = e;
  }
  pop() {
    return this.heap[--this.length];
  }
};
var I = class d2 {
  #o;
  #c;
  #S;
  #O;
  #w;
  #M;
  #I;
  #m;
  get perf() {
    return this.#m;
  }
  ttl;
  ttlResolution;
  ttlAutopurge;
  updateAgeOnGet;
  updateAgeOnHas;
  allowStale;
  noDisposeOnSet;
  noUpdateTTL;
  maxEntrySize;
  sizeCalculation;
  noDeleteOnFetchRejection;
  noDeleteOnStaleGet;
  allowStaleOnFetchAbort;
  allowStaleOnFetchRejection;
  ignoreFetchAbort;
  backgroundFetchSize;
  #n;
  #b;
  #s;
  #i;
  #t;
  #l;
  #u;
  #a;
  #h;
  #y;
  #r;
  #_;
  #F;
  #d;
  #g;
  #T;
  #U;
  #f;
  #D;
  static unsafeExposeInternals(e) {
    return { starts: e.#F, ttls: e.#d, autopurgeTimers: e.#g, sizes: e.#_, keyMap: e.#s, keyList: e.#i, valList: e.#t, next: e.#l, prev: e.#u, get head() {
      return e.#a;
    }, get tail() {
      return e.#h;
    }, free: e.#y, isBackgroundFetch: (t) => e.#e(t), backgroundFetch: (t, i, s, n) => e.#P(t, i, s, n), moveToTail: (t) => e.#L(t), indexes: (t) => e.#A(t), rindexes: (t) => e.#z(t), isStale: (t) => e.#p(t) };
  }
  get max() {
    return this.#o;
  }
  get maxSize() {
    return this.#c;
  }
  get calculatedSize() {
    return this.#b;
  }
  get size() {
    return this.#n;
  }
  get fetchMethod() {
    return this.#M;
  }
  get memoMethod() {
    return this.#I;
  }
  get dispose() {
    return this.#S;
  }
  get onInsert() {
    return this.#O;
  }
  get disposeAfter() {
    return this.#w;
  }
  constructor(e) {
    let { max: t = 0, ttl: i, ttlResolution: s = 1, ttlAutopurge: n, updateAgeOnGet: o, updateAgeOnHas: l, allowStale: h, dispose: r, onInsert: c, disposeAfter: m, noDisposeOnSet: _, noUpdateTTL: u, maxSize: g = 0, maxEntrySize: f = 0, sizeCalculation: y, fetchMethod: a, memoMethod: w, noDeleteOnFetchRejection: F, noDeleteOnStaleGet: b, allowStaleOnFetchRejection: p, allowStaleOnFetchAbort: A, ignoreFetchAbort: z, backgroundFetchSize: C = 1, perf: E } = e;
    if (this.backgroundFetchSize = C, E !== void 0 && typeof E?.now != "function") throw new TypeError("perf option must have a now() method if specified");
    if (this.#m = E ?? L, t !== 0 && !T(t)) throw new TypeError("max option must be a nonnegative integer");
    let v = t ? j(t) : Array;
    if (!v) throw new Error("invalid max value: " + t);
    if (this.#o = t, this.#c = g, this.maxEntrySize = f || this.#c, this.sizeCalculation = y, this.sizeCalculation) {
      if (!this.#c && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation != "function") throw new TypeError("sizeCalculation set to non-function");
    }
    if (w !== void 0 && typeof w != "function") throw new TypeError("memoMethod must be a function if defined");
    if (this.#I = w, a !== void 0 && typeof a != "function") throw new TypeError("fetchMethod must be a function if specified");
    if (this.#M = a, this.#U = !!a, this.#s = /* @__PURE__ */ new Map(), this.#i = Array.from({ length: t }).fill(void 0), this.#t = Array.from({ length: t }).fill(void 0), this.#l = new v(t), this.#u = new v(t), this.#a = 0, this.#h = 0, this.#y = x.create(t), this.#n = 0, this.#b = 0, typeof r == "function" && (this.#S = r), typeof c == "function" && (this.#O = c), typeof m == "function" ? (this.#w = m, this.#r = []) : (this.#w = void 0, this.#r = void 0), this.#T = !!this.#S, this.#D = !!this.#O, this.#f = !!this.#w, this.noDisposeOnSet = !!_, this.noUpdateTTL = !!u, this.noDeleteOnFetchRejection = !!F, this.allowStaleOnFetchRejection = !!p, this.allowStaleOnFetchAbort = !!A, this.ignoreFetchAbort = !!z, this.maxEntrySize !== 0) {
      if (this.#c !== 0 && !T(this.#c)) throw new TypeError("maxSize must be a positive integer if specified");
      if (!T(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
      this.#X();
    }
    if (this.allowStale = !!h, this.noDeleteOnStaleGet = !!b, this.updateAgeOnGet = !!o, this.updateAgeOnHas = !!l, this.ttlResolution = T(s) || s === 0 ? s : 1, this.ttlAutopurge = !!n, this.ttl = i || 0, this.ttl) {
      if (!T(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
      this.#k();
    }
    if (this.#o === 0 && this.ttl === 0 && this.#c === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !this.#o && !this.#c) {
      let D = "LRU_CACHE_UNBOUNDED";
      H(D) && (U.add(D), k("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", D, d2));
    }
  }
  getRemainingTTL(e) {
    return this.#s.has(e) ? 1 / 0 : 0;
  }
  #k() {
    let e = new O(this.#o), t = new O(this.#o);
    this.#d = e, this.#F = t;
    let i = this.ttlAutopurge ? Array.from({ length: this.#o }) : void 0;
    this.#g = i, this.#H = (h, r, c = this.#m.now()) => {
      t[h] = r !== 0 ? c : 0, e[h] = r, s(h, r);
    }, this.#R = (h) => {
      t[h] = e[h] !== 0 ? this.#m.now() : 0, s(h, e[h]);
    };
    let s = this.ttlAutopurge ? (h, r) => {
      if (i?.[h] && (clearTimeout(i[h]), i[h] = void 0), r && r !== 0 && i) {
        let c = setTimeout(() => {
          this.#p(h) ? (this.#E(this.#i[h], "expire"), i[h] = void 0) : s(h, l(h));
        }, r + 1);
        c.unref && c.unref(), i[h] = c;
      }
    } : () => {
    };
    this.#v = (h, r) => {
      if (e[r]) {
        let c = e[r], m = t[r];
        if (!c || !m) return;
        h.ttl = c, h.start = m, h.now = n || o();
        let _ = h.now - m;
        h.remainingTTL = c - _;
      }
    };
    let n = 0, o = () => {
      let h = this.#m.now();
      if (this.ttlResolution > 0) {
        n = h;
        let r = setTimeout(() => n = 0, this.ttlResolution);
        r.unref && r.unref();
      }
      return h;
    };
    this.getRemainingTTL = (h) => {
      let r = this.#s.get(h);
      return r === void 0 ? 0 : l(r);
    };
    let l = (h) => {
      let r = e[h], c = t[h];
      if (!r || !c) return 1 / 0;
      let m = (n || o()) - c;
      return r - m;
    };
    this.#p = (h) => {
      let r = t[h], c = e[h];
      return !!c && !!r && (n || o()) - r > c;
    };
  }
  #R = () => {
  };
  #v = () => {
  };
  #H = () => {
  };
  #p = () => false;
  #X() {
    let e = new O(this.#o);
    this.#b = 0, this.#_ = e, this.#x = (t) => {
      this.#b -= e[t], e[t] = 0;
    }, this.#N = (t, i, s, n) => {
      if (!T(s)) {
        if (this.#e(i)) return this.backgroundFetchSize;
        if (n) {
          if (typeof n != "function") throw new TypeError("sizeCalculation must be a function");
          if (s = n(i, t), !T(s)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      }
      return s;
    }, this.#j = (t, i, s) => {
      if (e[t] = i, this.#c) {
        let n = this.#c - e[t];
        for (; this.#b > n; ) this.#G(true);
      }
      this.#b += e[t], s && (s.entrySize = i, s.totalCalculatedSize = this.#b);
    };
  }
  #x = (e) => {
  };
  #j = (e, t, i) => {
  };
  #N = (e, t, i, s) => {
    if (i || s) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    return 0;
  };
  *#A({ allowStale: e = this.allowStale } = {}) {
    if (this.#n) for (let t = this.#h; this.#V(t) && ((e || !this.#p(t)) && (yield t), t !== this.#a); ) t = this.#u[t];
  }
  *#z({ allowStale: e = this.allowStale } = {}) {
    if (this.#n) for (let t = this.#a; this.#V(t) && ((e || !this.#p(t)) && (yield t), t !== this.#h); ) t = this.#l[t];
  }
  #V(e) {
    return e !== void 0 && this.#s.get(this.#i[e]) === e;
  }
  *entries() {
    for (let e of this.#A()) this.#t[e] !== void 0 && this.#i[e] !== void 0 && !this.#e(this.#t[e]) && (yield [this.#i[e], this.#t[e]]);
  }
  *rentries() {
    for (let e of this.#z()) this.#t[e] !== void 0 && this.#i[e] !== void 0 && !this.#e(this.#t[e]) && (yield [this.#i[e], this.#t[e]]);
  }
  *keys() {
    for (let e of this.#A()) {
      let t = this.#i[e];
      t !== void 0 && !this.#e(this.#t[e]) && (yield t);
    }
  }
  *rkeys() {
    for (let e of this.#z()) {
      let t = this.#i[e];
      t !== void 0 && !this.#e(this.#t[e]) && (yield t);
    }
  }
  *values() {
    for (let e of this.#A()) this.#t[e] !== void 0 && !this.#e(this.#t[e]) && (yield this.#t[e]);
  }
  *rvalues() {
    for (let e of this.#z()) this.#t[e] !== void 0 && !this.#e(this.#t[e]) && (yield this.#t[e]);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  [Symbol.toStringTag] = "LRUCache";
  find(e, t = {}) {
    for (let i of this.#A()) {
      let s = this.#t[i], n = this.#e(s) ? s.__staleWhileFetching : s;
      if (n !== void 0 && e(n, this.#i[i], this)) return this.#C(this.#i[i], t);
    }
  }
  forEach(e, t = this) {
    for (let i of this.#A()) {
      let s = this.#t[i], n = this.#e(s) ? s.__staleWhileFetching : s;
      n !== void 0 && e.call(t, n, this.#i[i], this);
    }
  }
  rforEach(e, t = this) {
    for (let i of this.#z()) {
      let s = this.#t[i], n = this.#e(s) ? s.__staleWhileFetching : s;
      n !== void 0 && e.call(t, n, this.#i[i], this);
    }
  }
  purgeStale() {
    let e = false;
    for (let t of this.#z({ allowStale: true })) this.#p(t) && (this.#E(this.#i[t], "expire"), e = true);
    return e;
  }
  info(e) {
    let t = this.#s.get(e);
    if (t === void 0) return;
    let i = this.#t[t], s = this.#e(i) ? i.__staleWhileFetching : i;
    if (s === void 0) return;
    let n = { value: s };
    if (this.#d && this.#F) {
      let o = this.#d[t], l = this.#F[t];
      if (o && l) {
        let h = o - (this.#m.now() - l);
        n.ttl = h, n.start = Date.now();
      }
    }
    return this.#_ && (n.size = this.#_[t]), n;
  }
  dump() {
    let e = [];
    for (let t of this.#A({ allowStale: true })) {
      let i = this.#i[t], s = this.#t[t], n = this.#e(s) ? s.__staleWhileFetching : s;
      if (n === void 0 || i === void 0) continue;
      let o = { value: n };
      if (this.#d && this.#F) {
        o.ttl = this.#d[t];
        let l = this.#m.now() - this.#F[t];
        o.start = Math.floor(Date.now() - l);
      }
      this.#_ && (o.size = this.#_[t]), e.unshift([i, o]);
    }
    return e;
  }
  load(e) {
    this.clear();
    for (let [t, i] of e) {
      if (i.start) {
        let s = Date.now() - i.start;
        i.start = this.#m.now() - s;
      }
      this.#W(t, i.value, i);
    }
  }
  set(e, t, i = {}) {
    let { status: s = S.hasSubscribers ? {} : void 0 } = i;
    i.status = s, s && (s.op = "set", s.key = e, t !== void 0 && (s.value = t), s.cache = this);
    let n = this.#W(e, t, i);
    return s && S.hasSubscribers && S.publish(s), n;
  }
  #W(e, t, i, s) {
    let { ttl: n = this.ttl, start: o, noDisposeOnSet: l = this.noDisposeOnSet, sizeCalculation: h = this.sizeCalculation, status: r } = i, c = this.#e(t);
    if (t === void 0) return r && (r.set = "deleted"), this.delete(e), this;
    let { noUpdateTTL: m = this.noUpdateTTL } = i;
    r && !c && (r.value = t);
    let _ = this.#N(e, t, i.size || 0, h, r);
    if (this.maxEntrySize && _ > this.maxEntrySize) return this.#E(e, "set"), r && (r.set = "miss", r.maxEntrySizeExceeded = true), this;
    let u = this.#n === 0 ? void 0 : this.#s.get(e);
    if (u === void 0) u = this.#n === 0 ? this.#h : this.#y.length !== 0 ? this.#y.pop() : this.#n === this.#o ? this.#G(false) : this.#n, this.#i[u] = e, this.#t[u] = t, this.#s.set(e, u), this.#l[this.#h] = u, this.#u[u] = this.#h, this.#h = u, this.#n++, this.#j(u, _, r), r && (r.set = "add"), m = false, this.#D && !c && this.#O?.(t, e, "add");
    else {
      this.#L(u);
      let g = this.#t[u];
      if (t !== g) {
        if (!l) if (this.#e(g)) {
          g !== s && g.__abortController.abort(new Error("replaced"));
          let { __staleWhileFetching: f } = g;
          f !== void 0 && f !== t && (this.#T && this.#S?.(f, e, "set"), this.#f && this.#r?.push([f, e, "set"]));
        } else this.#T && this.#S?.(g, e, "set"), this.#f && this.#r?.push([g, e, "set"]);
        if (this.#x(u), this.#j(u, _, r), this.#t[u] = t, !c) {
          let f = g && this.#e(g) ? g.__staleWhileFetching : g, y = f === void 0 ? "add" : t !== f ? "replace" : "update";
          r && (r.set = y, f !== void 0 && (r.oldValue = f)), this.#D && this.onInsert?.(t, e, y);
        }
      } else c || (r && (r.set = "update"), this.#D && this.onInsert?.(t, e, "update"));
    }
    if (n !== 0 && !this.#d && this.#k(), this.#d && (m || this.#H(u, n, o), r && this.#v(r, u)), !l && this.#f && this.#r) {
      let g = this.#r, f;
      for (; f = g?.shift(); ) this.#w?.(...f);
    }
    return this;
  }
  pop() {
    try {
      for (; this.#n; ) {
        let e = this.#t[this.#a];
        if (this.#G(true), this.#e(e)) {
          if (e.__staleWhileFetching) return e.__staleWhileFetching;
        } else if (e !== void 0) return e;
      }
    } finally {
      if (this.#f && this.#r) {
        let e = this.#r, t;
        for (; t = e?.shift(); ) this.#w?.(...t);
      }
    }
  }
  #G(e) {
    let t = this.#a, i = this.#i[t], s = this.#t[t], n = this.#e(s);
    n && s.__abortController.abort(new Error("evicted"));
    let o = n ? s.__staleWhileFetching : s;
    return (this.#T || this.#f) && o !== void 0 && (this.#T && this.#S?.(o, i, "evict"), this.#f && this.#r?.push([o, i, "evict"])), this.#x(t), this.#g?.[t] && (clearTimeout(this.#g[t]), this.#g[t] = void 0), e && (this.#i[t] = void 0, this.#t[t] = void 0, this.#y.push(t)), this.#n === 1 ? (this.#a = this.#h = 0, this.#y.length = 0) : this.#a = this.#l[t], this.#s.delete(i), this.#n--, t;
  }
  has(e, t = {}) {
    let { status: i = S.hasSubscribers ? {} : void 0 } = t;
    t.status = i, i && (i.op = "has", i.key = e, i.cache = this);
    let s = this.#Y(e, t);
    return S.hasSubscribers && S.publish(i), s;
  }
  #Y(e, t = {}) {
    let { updateAgeOnHas: i = this.updateAgeOnHas, status: s } = t, n = this.#s.get(e);
    if (n !== void 0) {
      let o = this.#t[n];
      if (this.#e(o) && o.__staleWhileFetching === void 0) return false;
      if (this.#p(n)) s && (s.has = "stale", this.#v(s, n));
      else return i && this.#R(n), s && (s.has = "hit", this.#v(s, n)), true;
    } else s && (s.has = "miss");
    return false;
  }
  peek(e, t = {}) {
    let { status: i = R() ? {} : void 0 } = t;
    i && (i.op = "peek", i.key = e, i.cache = this), t.status = i;
    let s = this.#J(e, t);
    return S.hasSubscribers && S.publish(i), s;
  }
  #J(e, t) {
    let { status: i, allowStale: s = this.allowStale } = t, n = this.#s.get(e);
    if (n === void 0 || !s && this.#p(n)) {
      i && (i.peek = n === void 0 ? "miss" : "stale");
      return;
    }
    let o = this.#t[n], l = this.#e(o) ? o.__staleWhileFetching : o;
    return i && (l !== void 0 ? (i.peek = "hit", i.value = l) : i.peek = "miss"), l;
  }
  #P(e, t, i, s) {
    let n = t === void 0 ? void 0 : this.#t[t];
    if (this.#e(n)) return n;
    let o = new AbortController(), { signal: l } = i;
    l?.addEventListener("abort", () => o.abort(l.reason), { signal: o.signal });
    let h = { signal: o.signal, options: i, context: s }, r = (f, y = false) => {
      let { aborted: a } = o.signal, w = i.ignoreFetchAbort && f !== void 0, F = i.ignoreFetchAbort || !!(i.allowStaleOnFetchAbort && f !== void 0);
      if (i.status && (a && !y ? (i.status.fetchAborted = true, i.status.fetchError = o.signal.reason, w && (i.status.fetchAbortIgnored = true)) : i.status.fetchResolved = true), a && !w && !y) return m(o.signal.reason, F);
      let b = u, p = this.#t[t];
      return (p === u || p === void 0 && w && y) && (f === void 0 ? b.__staleWhileFetching !== void 0 ? this.#t[t] = b.__staleWhileFetching : this.#E(e, "fetch") : (i.status && (i.status.fetchUpdated = true), this.#W(e, f, h.options, b))), f;
    }, c = (f) => (i.status && (i.status.fetchRejected = true, i.status.fetchError = f), m(f, false)), m = (f, y) => {
      let { aborted: a } = o.signal, w = a && i.allowStaleOnFetchAbort, F = w || i.allowStaleOnFetchRejection, b = F || i.noDeleteOnFetchRejection, p = u;
      if (this.#t[t] === u && (!b || !y && p.__staleWhileFetching === void 0 ? this.#E(e, "fetch") : w || (this.#t[t] = p.__staleWhileFetching)), F) return i.status && p.__staleWhileFetching !== void 0 && (i.status.returnedStale = true), p.__staleWhileFetching;
      if (p.__returned === p) throw f;
    }, _ = (f, y) => {
      let a = this.#M?.(e, n, h);
      o.signal.addEventListener("abort", () => {
        (!i.ignoreFetchAbort || i.allowStaleOnFetchAbort) && (f(void 0), i.allowStaleOnFetchAbort && (f = (w) => r(w, true)));
      }), a && a instanceof Promise ? a.then((w) => f(w === void 0 ? void 0 : w), y) : a !== void 0 && f(a);
    };
    i.status && (i.status.fetchDispatched = true);
    let u = new Promise(_).then(r, c), g = Object.assign(u, { __abortController: o, __staleWhileFetching: n, __returned: void 0 });
    return t === void 0 ? (this.#W(e, g, { ...h.options, status: void 0 }), t = this.#s.get(e)) : this.#t[t] = g, g;
  }
  #e(e) {
    if (!this.#U) return false;
    let t = e;
    return !!t && t instanceof Promise && t.hasOwnProperty("__staleWhileFetching") && t.__abortController instanceof AbortController;
  }
  fetch(e, t = {}) {
    let i = W.hasSubscribers, { status: s = R() ? {} : void 0 } = t;
    t.status = s, s && t.context && (s.context = t.context);
    let n = this.#B(e, t);
    return s && i && (s.trace = true, W.tracePromise(() => n, s).catch(() => {
    })), n;
  }
  async #B(e, t = {}) {
    let { allowStale: i = this.allowStale, updateAgeOnGet: s = this.updateAgeOnGet, noDeleteOnStaleGet: n = this.noDeleteOnStaleGet, ttl: o = this.ttl, noDisposeOnSet: l = this.noDisposeOnSet, size: h = 0, sizeCalculation: r = this.sizeCalculation, noUpdateTTL: c = this.noUpdateTTL, noDeleteOnFetchRejection: m = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: _ = this.allowStaleOnFetchRejection, ignoreFetchAbort: u = this.ignoreFetchAbort, allowStaleOnFetchAbort: g = this.allowStaleOnFetchAbort, context: f, forceRefresh: y = false, status: a, signal: w } = t;
    if (a && (a.op = "fetch", a.key = e, y && (a.forceRefresh = true), a.cache = this), !this.#U) return a && (a.fetch = "get"), this.#C(e, { allowStale: i, updateAgeOnGet: s, noDeleteOnStaleGet: n, status: a });
    let F = { allowStale: i, updateAgeOnGet: s, noDeleteOnStaleGet: n, ttl: o, noDisposeOnSet: l, size: h, sizeCalculation: r, noUpdateTTL: c, noDeleteOnFetchRejection: m, allowStaleOnFetchRejection: _, allowStaleOnFetchAbort: g, ignoreFetchAbort: u, status: a, signal: w }, b = this.#s.get(e);
    if (b === void 0) {
      a && (a.fetch = "miss");
      let p = this.#P(e, b, F, f);
      return p.__returned = p;
    } else {
      let p = this.#t[b];
      if (this.#e(p)) {
        let v = i && p.__staleWhileFetching !== void 0;
        return a && (a.fetch = "inflight", v && (a.returnedStale = true)), v ? p.__staleWhileFetching : p.__returned = p;
      }
      let A = this.#p(b);
      if (!y && !A) return a && (a.fetch = "hit"), this.#L(b), s && this.#R(b), a && this.#v(a, b), p;
      let z = this.#P(e, b, F, f), E = z.__staleWhileFetching !== void 0 && i;
      return a && (a.fetch = A ? "stale" : "refresh", E && A && (a.returnedStale = true)), E ? z.__staleWhileFetching : z.__returned = z;
    }
  }
  forceFetch(e, t = {}) {
    let i = W.hasSubscribers, { status: s = R() ? {} : void 0 } = t;
    t.status = s, s && t.context && (s.context = t.context);
    let n = this.#K(e, t);
    return s && i && (s.trace = true, W.tracePromise(() => n, s).catch(() => {
    })), n;
  }
  async #K(e, t = {}) {
    let i = await this.#B(e, t);
    if (i === void 0) throw new Error("fetch() returned undefined");
    return i;
  }
  memo(e, t = {}) {
    let { status: i = S.hasSubscribers ? {} : void 0 } = t;
    t.status = i, i && (i.op = "memo", i.key = e, t.context && (i.context = t.context), i.cache = this);
    let s = this.#Q(e, t);
    return i && (i.value = s), S.hasSubscribers && S.publish(i), s;
  }
  #Q(e, t = {}) {
    let i = this.#I;
    if (!i) throw new Error("no memoMethod provided to constructor");
    let { context: s, status: n, forceRefresh: o, ...l } = t;
    n && o && (n.forceRefresh = true);
    let h = this.#C(e, l), r = o || h === void 0;
    if (n && (n.memo = r ? "miss" : "hit", r || (n.value = h)), !r) return h;
    let c = i(e, h, { options: l, context: s });
    return n && (n.value = c), this.#W(e, c, l), c;
  }
  get(e, t = {}) {
    let { status: i = S.hasSubscribers ? {} : void 0 } = t;
    t.status = i, i && (i.op = "get", i.key = e, i.cache = this);
    let s = this.#C(e, t);
    return i && (s !== void 0 && (i.value = s), S.hasSubscribers && S.publish(i)), s;
  }
  #C(e, t = {}) {
    let { allowStale: i = this.allowStale, updateAgeOnGet: s = this.updateAgeOnGet, noDeleteOnStaleGet: n = this.noDeleteOnStaleGet, status: o } = t, l = this.#s.get(e);
    if (l === void 0) {
      o && (o.get = "miss");
      return;
    }
    let h = this.#t[l], r = this.#e(h);
    return o && this.#v(o, l), this.#p(l) ? r ? (o && (o.get = "stale-fetching"), i && h.__staleWhileFetching !== void 0 ? (o && (o.returnedStale = true), h.__staleWhileFetching) : void 0) : (n || this.#E(e, "expire"), o && (o.get = "stale"), i ? (o && (o.returnedStale = true), h) : void 0) : (o && (o.get = r ? "fetching" : "hit"), this.#L(l), s && this.#R(l), r ? h.__staleWhileFetching : h);
  }
  #$(e, t) {
    this.#u[t] = e, this.#l[e] = t;
  }
  #L(e) {
    e !== this.#h && (e === this.#a ? this.#a = this.#l[e] : this.#$(this.#u[e], this.#l[e]), this.#$(this.#h, e), this.#h = e);
  }
  delete(e) {
    return this.#E(e, "delete");
  }
  #E(e, t) {
    S.hasSubscribers && S.publish({ op: "delete", delete: t, key: e, cache: this });
    let i = false;
    if (this.#n !== 0) {
      let s = this.#s.get(e);
      if (s !== void 0) if (this.#g?.[s] && (clearTimeout(this.#g[s]), this.#g[s] = void 0), i = true, this.#n === 1) this.#q(t);
      else {
        this.#x(s);
        let n = this.#t[s];
        if (this.#e(n) ? n.__abortController.abort(new Error("deleted")) : (this.#T || this.#f) && (this.#T && this.#S?.(n, e, t), this.#f && this.#r?.push([n, e, t])), this.#s.delete(e), this.#i[s] = void 0, this.#t[s] = void 0, s === this.#h) this.#h = this.#u[s];
        else if (s === this.#a) this.#a = this.#l[s];
        else {
          let o = this.#u[s];
          this.#l[o] = this.#l[s];
          let l = this.#l[s];
          this.#u[l] = this.#u[s];
        }
        this.#n--, this.#y.push(s);
      }
    }
    if (this.#f && this.#r?.length) {
      let s = this.#r, n;
      for (; n = s?.shift(); ) this.#w?.(...n);
    }
    return i;
  }
  clear() {
    return this.#q("delete");
  }
  #q(e) {
    for (let t of this.#z({ allowStale: true })) {
      let i = this.#t[t];
      if (this.#e(i)) i.__abortController.abort(new Error("deleted"));
      else {
        let s = this.#i[t];
        this.#T && this.#S?.(i, s, e), this.#f && this.#r?.push([i, s, e]);
      }
    }
    if (this.#s.clear(), this.#t.fill(void 0), this.#i.fill(void 0), this.#d && this.#F) {
      this.#d.fill(0), this.#F.fill(0);
      for (let t of this.#g ?? []) t !== void 0 && clearTimeout(t);
      this.#g?.fill(void 0);
    }
    if (this.#_ && this.#_.fill(0), this.#a = 0, this.#h = 0, this.#y.length = 0, this.#b = 0, this.#n = 0, this.#f && this.#r) {
      let t = this.#r, i;
      for (; i = t?.shift(); ) this.#w?.(...i);
    }
  }
};

// apps/server/src/services/cache.ts
var TWO_HOURS_MS = 2 * 60 * 60 * 1e3;
var auditCache = new I({
  max: 1e3,
  ttl: TWO_HOURS_MS,
  allowStale: false,
  updateAgeOnGet: false
});

// apps/server/src/services/rate-limit.ts
var windowMs = 60 * 1e3;
var maxRequests = 30;
var clients = /* @__PURE__ */ new Map();
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of clients.entries()) {
    if (now > record.resetAt) {
      clients.delete(ip);
    }
  }
}, 60 * 1e3);
function isRateLimited(clientId) {
  const now = Date.now();
  let record = clients.get(clientId);
  if (!record || now > record.resetAt) {
    record = {
      count: 1,
      resetAt: now + windowMs
    };
    clients.set(clientId, record);
    return { limited: false, remaining: maxRequests - 1, resetInSec: 60 };
  }
  if (record.count >= maxRequests) {
    return {
      limited: true,
      remaining: 0,
      resetInSec: Math.ceil((record.resetAt - now) / 1e3)
    };
  }
  record.count += 1;
  return {
    limited: false,
    remaining: maxRequests - record.count,
    resetInSec: Math.ceil((record.resetAt - now) / 1e3)
  };
}

// apps/server/src/app.ts
var app = new Hono3();
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return "*";
      if (origin.startsWith("chrome-extension://")) return origin;
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) return origin;
      return origin;
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Authorization", "X-Client-Version", "Content-Type"]
  })
);
app.get("/health", (c) => {
  return c.json({ status: "ok", service: "domain-pulse-gateway", time: (/* @__PURE__ */ new Date()).toISOString() });
});
app.post("/v1/cache/clear", (c) => {
  auditCache.clear();
  return c.json({ success: true, message: "Audit cache cleared" });
});
app.get("/v1/audit", async (c) => {
  const startTime = Date.now();
  const rawDomain = c.req.query("domain");
  if (!rawDomain) {
    return c.json({ error: 'Missing required query parameter "domain"' }, 400);
  }
  const clientIp = c.req.header("x-forwarded-for")?.split(",")[0].trim() || c.req.header("cf-connecting-ip") || "anonymous-client";
  const rateCheck = isRateLimited(clientIp);
  c.header("X-RateLimit-Limit", "30");
  c.header("X-RateLimit-Remaining", String(rateCheck.remaining));
  c.header("X-RateLimit-Reset", String(rateCheck.resetInSec));
  if (rateCheck.limited) {
    return c.json(
      {
        error: "Too Many Requests",
        message: `Has superado el l\xEDmite de 30 consultas por minuto. Espera ${rateCheck.resetInSec} segundos.`
      },
      429
    );
  }
  let cleanInput = rawDomain.trim().toLowerCase();
  cleanInput = cleanInput.replace(/^[a-z]+:\/\//, "");
  cleanInput = cleanInput.replace(/\/.*$/, "");
  cleanInput = cleanInput.replace(/:[0-9]+$/, "");
  const parsed = (0, import_tldts.parse)(cleanInput);
  const targetDomain = parsed.domain || cleanInput;
  if (!targetDomain || !targetDomain.includes(".")) {
    return c.json({ error: "Invalid domain name format provided." }, 400);
  }
  const cachedResult = auditCache.get(targetDomain);
  if (cachedResult) {
    c.header("X-Cache-Status", "HIT");
    return c.json({
      ...cachedResult,
      cached: true,
      latency_ms: Date.now() - startTime
    });
  }
  c.header("X-Cache-Status", "MISS");
  try {
    const [dnsResult, tlsResult, httpProbeResult] = await Promise.all([
      fetchAllDnsRecords(targetDomain),
      inspectTls(targetDomain),
      probeHttpAndTech(targetDomain)
    ]);
    const [rdapResult, subdomainsResult] = await Promise.all([
      fetchRdapInfo(targetDomain, dnsResult.nameservers),
      discoverRealSubdomains(targetDomain, tlsResult.san_domains)
    ]);
    const ssl = {
      issuer: tlsResult.issuer,
      valid_from: tlsResult.valid_from,
      valid_to: tlsResult.valid_to,
      days_remaining: tlsResult.days_remaining,
      tls_version: tlsResult.tls_version,
      hsts_enabled: httpProbeResult.hsts_enabled || tlsResult.hsts_enabled,
      is_valid: tlsResult.is_valid,
      error: tlsResult.error
    };
    const detected_provider = detectDnsProvider(dnsResult.a_records, dnsResult.nameservers);
    const spf = parseSpf(dnsResult.txt_records);
    const dmarc = parseDmarc(dnsResult.dmarc_txt_records, dnsResult.txt_records);
    const mta_sts = parseMtaSts(dnsResult.mta_sts_txt_records);
    const bimi = parseBimi(dnsResult.bimi_txt_records);
    const emailProvider = detectEmailProvider(dnsResult.mx_records);
    const email = {
      mx_records: dnsResult.mx_records,
      provider: emailProvider,
      spf,
      dmarc,
      mta_sts,
      bimi
    };
    const dns = {
      a_records: dnsResult.a_records,
      aaaa_records: dnsResult.aaaa_records,
      detected_provider,
      has_ipv6: dnsResult.aaaa_records.length > 0,
      nameservers: dnsResult.nameservers,
      dnssec: {
        enabled: dnsResult.dnssec_ds_records.length > 0 || dnsResult.dnssec_ad_flag,
        ds_records: dnsResult.dnssec_ds_records
      },
      caa: {
        configured: dnsResult.caa_records.length > 0,
        records: dnsResult.caa_records
      }
    };
    const registration = {
      ...rdapResult,
      nameservers: rdapResult.nameservers.length > 0 ? rdapResult.nameservers : dnsResult.nameservers
    };
    const scoreResult = calculateHealthScore(
      registration,
      dns,
      ssl,
      email,
      httpProbeResult.security_headers
    );
    const auditResponse = {
      domain: targetDomain,
      score: scoreResult.score,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      registration,
      dns,
      ssl,
      email,
      security_headers: httpProbeResult.security_headers,
      tech_stack: httpProbeResult.tech_stack,
      subdomains: subdomainsResult,
      warnings: scoreResult.warnings,
      score_breakdown: {
        grade: scoreResult.grade,
        penalties: scoreResult.penalties
      },
      cached: false,
      latency_ms: Date.now() - startTime
    };
    auditCache.set(targetDomain, auditResponse);
    return c.json(auditResponse);
  } catch (err) {
    console.error("Audit execution error:", err);
    return c.json(
      {
        error: "Audit execution failed",
        message: err?.message || "Error inesperado durante la auditor\xEDa del dominio."
      },
      500
    );
  }
});

// apps/server/src/volcano-handler.ts
async function handler(event) {
  if (event.method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": "86400"
      },
      body: ""
    };
  }
  const scheme = event.request_context?.scheme || "https";
  const host = event.headers?.["host"]?.[0] || event.request_context?.host || "localhost";
  const path = event.path || "/";
  const qs = event.raw_query_string ? `?${event.raw_query_string}` : "";
  const url = `${scheme}://${host}${path}${qs}`;
  const headers = new Headers();
  if (event.headers) {
    for (const [key, val] of Object.entries(event.headers)) {
      if (Array.isArray(val)) {
        for (const v of val) headers.append(key, String(v));
      } else if (val) {
        headers.append(key, String(val));
      }
    }
  }
  const reqInit = {
    method: event.method || "GET",
    headers
  };
  if (event.body && event.method !== "GET" && event.method !== "HEAD") {
    reqInit.body = event.is_base64_encoded ? Buffer.from(event.body, "base64") : event.body;
  }
  try {
    const req = new Request(url, reqInit);
    const res = await app.fetch(req);
    const body = await res.text();
    const outHeaders = {};
    res.headers.forEach((v, k2) => {
      outHeaders[k2] = v;
    });
    outHeaders["access-control-allow-origin"] = "*";
    outHeaders["access-control-allow-methods"] = "GET, POST, OPTIONS";
    outHeaders["access-control-allow-headers"] = "*";
    return {
      statusCode: res.status,
      headers: outHeaders,
      body
    };
  } catch (err) {
    console.error("Volcano handler error:", err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        error: "Internal Server Error",
        message: err?.message || String(err)
      })
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
