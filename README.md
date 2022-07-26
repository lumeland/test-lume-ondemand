# test-lume-ondemand

This is a repository to test Lume in [Deno deploy](https://deno.com/deploy/) to
generate pages on demand.

ATM, the support is very poor due the following limitation in Deno Deploy:

- There's no support for dynamic imports.
  [See issue](https://github.com/denoland/deploy_feedback/issues/1)
- ~~Nunjucks (I didn't test other template engines) doesn't work because
  `eval()` or `new Function` is not allowed.
  [See issue](https://github.com/denoland/deploy_feedback/issues/125)~~
- ~~Import maps are not supported.
  [See issue](https://github.com/denoland/deploy_feedback/issues/17)~~
