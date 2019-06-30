let loadUserflowPromise

module.exports.loadUserflow = function(opts) {
  opts = opts || {}
  if (!loadUserflowPromise) {
    loadUserflowPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = opts.url || 'https://js.getuserflow.com/userflow.js'
      script.onload = () => {
        if (!window.userflow) {
          reject(
            new Error(
              'Userflow.js script was loaded, but the userflow global was not found.'
            )
          )
          return
        }
        resolve(window.userflow)
      }
      script.onerror = () => {
        loadUserflowPromise = undefined
        reject(new Error('Could not load Userflow.js'))
      }
      document.head.appendChild(script)
    })
  }
  return loadUserflowPromise
}
