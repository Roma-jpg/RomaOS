# Кошелев Роман - portfolio

Статический сайт-визитка на чистом HTML, CSS и JavaScript. Внешние библиотеки, сборщик и сервер не требуются.

## Запуск

Откройте `index.html` в браузере.

Для запуска через локальный HTTP-сервер:

```bash
python -m http.server 8000
```

Затем откройте `http://localhost:8000`.

## Контакты

- Email: `rkoshelev2001@gmail.com`
- GitHub: `https://github.com/Roma-jpg`

Основные данные находятся в объекте `CONFIG` в начале файла `script.js`.

## Как добавить фотографии проектов

Фотографии и скриншоты удобно хранить в папке:

```text
assets/projects/
```

У каждого проекта в `script.js` есть массив `images`:

```js
images: [
  {
    src: "assets/projects/my-project-cover.jpg",
    alt: "Описание изображения проекта"
  },
  {
    src: "assets/projects/my-project-inside.jpg",
    alt: "Второй ракурс проекта"
  }
]
```

Можно использовать PNG, JPG, WebP, GIF или SVG. Первое изображение становится обложкой. Если изображений несколько, на карточке автоматически появляются переключатели.

Если файл отсутствует или не загрузился, сайт показывает встроенную графическую заглушку с буквой проекта.

## Добавление нового проекта

Скопируйте объект внутри `CONFIG.projects` и измените:

- `id` - короткий уникальный идентификатор латиницей;
- `number` - номер в списке;
- `category` - `hardware`, `software` или `flipper`;
- `title`, `subtitle`, `description`;
- `proof` - что проект подтверждает;
- `tags`;
- `status`;
- `images`.

## Терминал

Терминал открывается кнопкой в шапке или сочетанием `Ctrl + K`.

Обычный режим содержит команды профиля:

```text
help
whoami
work
open <project-id>
status
contact
github
email
neofetch
openweb <url>
cowsay <text>
debug
clear
exit
```

История переключается стрелками вверх и вниз. Tab дополняет команды и пути.

## romeoOS и виртуальная файловая система

Команда:

```text
easter egg
```

монтирует игрушечную Unix-подобную систему. Также работают `easteregg`, `egg` и `mount secret`.

Файлы существуют только внутри JavaScript. Изменения сохраняются в `localStorage` браузера, когда он доступен. Сайт не получает доступ к настоящей файловой системе устройства.

### Навигация и чтение

```text
ls [-la] [path]
cd [path]
pwd
cat <file>
less <file>
tree [path]
find [path] [-name pattern]
grep [-in] pattern file
file <path>
stat <path>
wc [-lwc] <file>
head [-n N] <file>
tail [-n N] <file>
```

### Создание и редактирование

```text
touch <file>
mkdir [-p] <directory>
rm [-rf] <path>
nano <file>
chmod <mode> <path>
echo <text> > file
echo <text> >> file
```

`nano` открывает встроенный редактор. Сохранение - `Ctrl + S`, выход - `Ctrl + X`. На мобильных устройствах доступны экранные кнопки.

`chmod` является игрушечной реализацией. Поддерживаются трёхзначные режимы вроде `755`, `644`, `700`, а также `+x` и `-x`. Права отображаются в `ls -l` и `stat`, но намеренно не блокируют команды.

### Shell и системные команды

```text
clear
whoami
hostname
date
uptime
history
alias
env
export
which
neofetch
cowsay
ping
nmap
openweb
debug
```

Пример alias:

```bash
alias ll='ls -la'
alias hi='cowsay hello'
```

`ping` и `nmap` являются визуальными симуляциями и не отправляют сетевые пакеты. Это специально указано в их выводе.

`openweb` принимает только HTTP и HTTPS адреса:

```bash
openweb romeo558.ru
openweb https://github.com/Roma-jpg
```

## Debug console

Команда `debug` включает JavaScript-консоль в контексте текущей страницы.

Примеры:

```js
document.title
document.querySelector("h1").textContent
romeoOS.cwd
romeoOS.fs
romeoOS.resetFS()
document.body.classList.toggle("signal-unlocked")
```

Для выхода:

```text
.exit
```

Этот режим может менять DOM и состояние открытой страницы в браузере посетителя. Он не даёт серверного доступа и не позволяет читать настоящие файлы устройства.

## Corruption и self-recovery

Команды вида:

```text
sudo rm -rf /
rm -rf /
```

запускают только визуальный сценарий повреждения сайта. Через 10 секунд стартует recovery environment, восстанавливает интерфейс и возвращает shell. Перезагрузка страницы тоже сразу возвращает сайт.

Обычный `rm` внутри romeoOS действительно удаляет виртуальные файлы и папки:

```bash
rm file.txt
rm -r directory
```

## Публикация

Сайт можно разместить на GitHub Pages, Cloudflare Pages, Netlify, Vercel, Timeweb или любом статическом хостинге.

## Изменения v5

- надпись `КР` на интерактивном drag-элементе сделана белой;
- файловая система стала записываемой и сохраняется в браузере;
- добавлены `touch`, `mkdir`, `rm`, `nano` и `chmod`;
- добавлены все основные команды чтения и анализа текста;
- добавлены `alias`, `env`, `export`, `which`, `history` и системные команды;
- добавлен обязательный `neofetch` для romeoOS;
- добавлены игрушечные `ping` и `nmap` без реальных сетевых запросов;
- добавлен `openweb` с проверкой URL;
- добавлены `cowsay` и настоящая JS debug console страницы;
- встроенные редактор и pager адаптированы под мобильные устройства.


## Virtual filesystem image

The default romeoOS filesystem now mirrors the supplied `website_files.zip` content:

```text
/welcome.txt
/available_commands.txt
/projects/*.txt
/stuff/*.txt
```

The fifth portfolio item is now **«Этот сайт»**. The localStorage filesystem key was bumped, so the new default image is loaded instead of an older cached filesystem.
