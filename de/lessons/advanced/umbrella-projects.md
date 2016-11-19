---
layout: page
title: Umbrella-Projekte
category: advanced
order: 8
lang: de
---

Manchmal kann ein Projekt richtig groß werden. Das Mix build tool erlaubt uns unseren Code in mehrere Anwendungen zu teilen und unser Elixirprojekt einfacher handhabbar zu machen, wenn es größer wird.

{% include toc.html %}

## Einführung

Um ein Umbrella-Projekt zu erstellen, starten wir ein Projekt wie üblich, übergeben jedoch das `--umbrella` flag.
In diesem Beispiel werden wir *die Shell* eines Toolkits zum Maschinellen Lernen erstellen. Warum ein Toolkit zum Maschinellen Lernen? Warum nicht? Es besteht aus verschiedenen Lernalgorithmen und Utilityfunktionen.

```shell
$ mix new machine_learning_toolkit --umbrella

* creating .gitignore
* creating README.md
* creating mix.exs
* creating apps
* creating config
* creating config/config.exs

Your umbrella project was created successfully.
Inside your project, you will find an apps/ directory
where you can create and host many apps:

    cd machine_learning_toolkit
    cd apps
    mix new my_app

Commands like "mix compile" and "mix test" when executed
in the umbrella project root will automatically run
for each application in the apps/ directory.
```

Wie du am Shellbefehl sehen kannst, erstellt Mix ein kleines Projekt für uns mit zwei Verzeichnissen:

  - `apps/` - hier werden unsere Unterprojekte wohnen
  - `config/` - wo die Konfiguration für unser Umbrella-Projekt lebt

## Kindprojekte

Lass uns in das `machine_learning_toolkit/apps`-Verzeichnis unseres Projekts wechseln und drei normale Anwendungen mit Mix erstellen:

```shell
$ mix new utilities

* creating README.md
* creating .gitignore
* creating mix.exs
* creating config
* creating config/config.exs
* creating lib
* creating lib/utilities.ex
* creating test
* creating test/test_helper.exs
* creating test/utilities_test.exs

Your Mix project was created successfully.
You can use "mix" to compile it, test it, and more:

    cd utilities
    mix test

Run "mix help" for more commands.


$ mix new datasets

* creating README.md
* creating .gitignore
* creating mix.exs
* creating config
* creating config/config.exs
* creating lib
* creating lib/datasets.ex
* creating test
* creating test/test_helper.exs
* creating test/datasets_test.exs

Your Mix project was created successfully.
You can use "mix" to compile it, test it, and more:

    cd datasets
    mix test

Run "mix help" for more commands.

$ mix new svm

* creating README.md
* creating .gitignore
* creating mix.exs
* creating config
* creating config/config.exs
* creating lib
* creating lib/svm.ex
* creating test
* creating test/test_helper.exs
* creating test/svm_test.exs

Your Mix project was created successfully.
You can use "mix" to compile it, test it, and more:

    cd svm
    mix test

Run "mix help" for more commands.
```

Wir sollten nun einen Verzeichnisbaum wie folgt haben:

```shell
$ tree
.
├── README.md
├── apps
│   ├── datasets
│   │   ├── README.md
│   │   ├── config
│   │   │   └── config.exs
│   │   ├── lib
│   │   │   └── datasets.ex
│   │   ├── mix.exs
│   │   └── test
│   │       ├── datasets_test.exs
│   │       └── test_helper.exs
│   ├── svm
│   │   ├── README.md
│   │   ├── config
│   │   │   └── config.exs
│   │   ├── lib
│   │   │   └── svm.ex
│   │   ├── mix.exs
│   │   └── test
│   │       ├── svm_test.exs
│   │       └── test_helper.exs
│   └── utilities
│       ├── README.md
│       ├── config
│       │   └── config.exs
│       ├── lib
│       │   └── utilities.ex
│       ├── mix.exs
│       └── test
│           ├── test_helper.exs
│           └── utilities_test.exs
├── config
│   └── config.exs
└── mix.exs
```

Falls wir zurück zur Wurzel unseres Umbrella-Projekts wechseln, können wir sehen, dass wir jeden üblichen Befehl wie etwa compile aufrufen können. Da Unterprojekte auch nur normale Anwendungen sind, kannst du in ihr Verzeichnis wechseln und all die bekannten Sachen machen, die dir Mix erlaubt.

```
$ mix compile

==> svm
Compiled lib/svm.ex
Generated svm app

==> datasets
Compiled lib/datasets.ex
Generated datasets app

==> utilities
Compiled lib/utilities.ex
Generated utilities app

Consolidated List.Chars
Consolidated Collectable
Consolidated String.Chars
Consolidated Enumerable
Consolidated IEx.Info
Consolidated Inspect
```

## IEx

Du denkst eventuell, dass der Umgang mit Anwendungen in einem Umbrella-Projekt ein wenig anders sein könnte. Nun, glaub es oder nicht, du könntest falsch liegen! Wenn wir in unser Hauptverzeichnis wechseln und IEx mit `iex -S mix` starten, können wir mit all unseren Projekten wie sonst auch interagieren. Lass uns für das folgende Beispiel den Inhalt von `apps/datasets/lib/datasets.ex` verändern.

```elixir
defmodule Datasets do
  def hello do
    IO.puts "Hello, I'm the datasets"
  end
end
```

```shell
$ iex -S mix
Erlang/OTP {{ site.erlang.OTP }} [erts-{{ site.erlang.erts }}] [source] [64-bit] [smp:4:4] [async-threads:10] [hipe] [kernel-poll:false] [dtrace]

==> datasets
Compiled lib/datasets.ex
Consolidated List.Chars
Consolidated Collectable
Consolidated String.Chars
Consolidated Enumerable
Consolidated IEx.Info
Consolidated Inspect
Interactive Elixir ({{ site.elixir.version }}) - press Ctrl+C to exit (type h() ENTER for help)

iex> Datasets.hello
Hello, I'm the datasets
:ok
```