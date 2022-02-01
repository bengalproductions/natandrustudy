# natandrustudy
Copyright (C) 2022 Bengal Productions, reproducible under GNU3 license.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

This repo isn't automatically connected to the site, so is usually behind by a lot until I find the time to update it.

To use, make a project on [Deta](https://deta.sh) and an API key on [Short.io](https://short.io) and then, create .env file with contents:
```
DETA_KEY="yourdetaprojectkey"
DETA_ID="yourdetaprojectid"
SHORT_API_KEY="sk_yourapikey"
```
Then use command `npm install` to install dependencies and then `npm run buildcss` to build the TailwindCSS file to `/public/styles/build.min.css`
