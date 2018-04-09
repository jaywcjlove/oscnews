const eslintrc = {
  "presets": [
    [ "env", {
        "targets": {
          "browsers": ["last 2 versions", "ie > 8"]
        }
      }
    ],
    "stage-0",
    "react"
  ],
  "plugins": [
    "transform-object-rest-spread",
    "dynamic-import-node",
    "transform-runtime"
  ]
}

module.exports = eslintrc
