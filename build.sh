#!/usr/bin/env bash

set -euo pipefail

readonly PLUGIN_DIRECTORY="mangopeel_neo"
readonly ARTIFACT_NAME="MangoPeel-Neo"
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly STAGING_ROOT="$(mktemp -d)"
readonly PACKAGE_DIR="${STAGING_ROOT}/${PLUGIN_DIRECTORY}"
readonly PACKAGE_PATHS=(
  "dist"
  "main.py"
  "package.json"
  "plugin.json"
  "README.md"
  "README_CN.md"
  "README_JA.md"
  "LICENSE"
)

# パッケージ作成に使用した一時ディレクトリを削除する。
cleanup() {
  rm -rf "${STAGING_ROOT}"
}

trap cleanup EXIT

cd "${SCRIPT_DIR}"

for command_name in npm zip tar; do
  if ! command -v "${command_name}" >/dev/null 2>&1; then
    printf 'エラー: %s コマンドが見つかりません。\n' "${command_name}" >&2
    exit 1
  fi
done

npm run build
mkdir -p "${PACKAGE_DIR}"

for package_path in "${PACKAGE_PATHS[@]}"; do
  if [[ ! -e "${package_path}" ]]; then
    printf 'エラー: パッケージ対象の %s が見つかりません。\n' "${package_path}" >&2
    exit 1
  fi
  cp -R "${package_path}" "${PACKAGE_DIR}/"
done

find "${PACKAGE_DIR}/dist" -type f -name '*.js.map' -delete
rm -f "${ARTIFACT_NAME}.zip" "${ARTIFACT_NAME}.tar.gz"

(
  cd "${STAGING_ROOT}"
  zip -qr "${SCRIPT_DIR}/${ARTIFACT_NAME}.zip" "${PLUGIN_DIRECTORY}"
  tar -czf "${SCRIPT_DIR}/${ARTIFACT_NAME}.tar.gz" "${PLUGIN_DIRECTORY}"
)

printf 'パッケージを生成しました:\n'
printf '  %s/%s.zip\n' "${SCRIPT_DIR}" "${ARTIFACT_NAME}"
printf '  %s/%s.tar.gz\n' "${SCRIPT_DIR}" "${ARTIFACT_NAME}"
