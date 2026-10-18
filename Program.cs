using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

const int Size = 4;

var game = new Game2048();
game.Run();

public sealed class Game2048
{
    private readonly Random _random = new();
    private readonly int[,] _grid = new int[Size, Size];
    private int[,]? _previousGrid;
    private int _score;
    private int _previousScore;
    private int _highScore;

    public Game2048()
    {
        _highScore = LoadHighScore();
        Reset();
    }

    public void Run()
    {
        Console.CursorVisible = false;
        Console.OutputEncoding = System.Text.Encoding.UTF8;

        while (true)
        {
            Render();

            if (!CanMove())
            {
                RenderMessage("Game Over! Press R to restart or Q to quit.");
                var key = Console.ReadKey(true);
                if (key.Key is ConsoleKey.R or ConsoleKey.Enter)
                {
                    Reset();
                    continue;
                }
                if (key.Key is ConsoleKey.Q or ConsoleKey.Escape)
                {
                    SaveHighScore();
                    return;
                }
                continue;
            }

            var input = Console.ReadKey(true);

            if (input.Key is ConsoleKey.R)
            {
                Reset();
                continue;
            }

            if (input.Key is ConsoleKey.Q or ConsoleKey.Escape)
            {
                SaveHighScore();
                return;
            }

            if (input.Key is ConsoleKey.U)
            {
                Undo();
                continue;
            }

            if (TryGetDirection(input, out var dir))
            {
                SaveState();
                var moved = Move(dir);
                if (moved)
                {
                    SpawnTile();
                    if (_score > _highScore)
                    {
                        _highScore = _score;
                        SaveHighScore();
                    }
                }
            }
        }
    }

    private void Reset()
    {
        Array.Clear(_grid, 0, _grid.Length);
        _score = 0;
        _previousGrid = null;
        _previousScore = 0;
        SpawnTile();
        SpawnTile();
    }

    private void SaveState()
    {
        _previousGrid = new int[Size, Size];
        Buffer.BlockCopy(_grid, 0, _previousGrid, 0, sizeof(int) * Size * Size);
        _previousScore = _score;
    }

    private void Undo()
    {
        if (_previousGrid is null)
            return;

        Buffer.BlockCopy(_previousGrid, 0, _grid, 0, sizeof(int) * Size * Size);
        _score = _previousScore;
        _previousGrid = null;
    }

    private bool TryGetDirection(ConsoleKeyInfo key, out string direction)
    {
        direction = string.Empty;

        switch (key.Key)
        {
            case ConsoleKey.UpArrow:
            case ConsoleKey.W:
                direction = "up";
                return true;
            case ConsoleKey.DownArrow:
            case ConsoleKey.S:
                direction = "down";
                return true;
            case ConsoleKey.LeftArrow:
            case ConsoleKey.A:
                direction = "left";
                return true;
            case ConsoleKey.RightArrow:
            case ConsoleKey.D:
                direction = "right";
                return true;
        }

        var c = char.ToLowerInvariant(key.KeyChar);
        switch (c)
        {
            case 'w': direction = "up"; return true;
            case 's': direction = "down"; return true;
            case 'a': direction = "left"; return true;
            case 'd': direction = "right"; return true;
            default: return false;
        }
    }

    private bool Move(string direction)
    {
        return direction switch
        {
            "left" => MoveLeft(),
            "right" => MoveRight(),
            "up" => MoveUp(),
            "down" => MoveDown(),
            _ => false,
        };
    }

    private bool MoveLeft()
    {
        var moved = false;
        for (var row = 0; row < Size; row++)
        {
            var line = new int[Size];
            for (var col = 0; col < Size; col++)
                line[col] = _grid[row, col];

            var merged = MergeLine(line, out var lineMoved);
            if (lineMoved)
                moved = true;

            for (var col = 0; col < Size; col++)
                _grid[row, col] = merged[col];
        }
        return moved;
    }

    private bool MoveRight()
    {
        var moved = false;
        for (var row = 0; row < Size; row++)
        {
            var line = new int[Size];
            for (var col = 0; col < Size; col++)
                line[Size - 1 - col] = _grid[row, col];

            var merged = MergeLine(line, out var lineMoved);
            if (lineMoved)
                moved = true;

            for (var col = 0; col < Size; col++)
                _grid[row, col] = merged[Size - 1 - col];
        }
        return moved;
    }

    private bool MoveUp()
    {
        var moved = false;
        for (var col = 0; col < Size; col++)
        {
            var line = new int[Size];
            for (var row = 0; row < Size; row++)
                line[row] = _grid[row, col];

            var merged = MergeLine(line, out var lineMoved);
            if (lineMoved)
                moved = true;

            for (var row = 0; row < Size; row++)
                _grid[row, col] = merged[row];
        }
        return moved;
    }

    private bool MoveDown()
    {
        var moved = false;
        for (var col = 0; col < Size; col++)
        {
            var line = new int[Size];
            for (var row = 0; row < Size; row++)
                line[Size - 1 - row] = _grid[row, col];

            var merged = MergeLine(line, out var lineMoved);
            if (lineMoved)
                moved = true;

            for (var row = 0; row < Size; row++)
                _grid[row, col] = merged[Size - 1 - row];
        }
        return moved;
    }

    private int[] MergeLine(int[] line, out bool moved)
    {
        moved = false;

        var values = new List<int>();
        foreach (var value in line)
        {
            if (value != 0)
                values.Add(value);
        }

        var merged = new List<int>();
        for (var i = 0; i < values.Count; i++)
        {
            if (i + 1 < values.Count && values[i] == values[i + 1])
            {
                var total = values[i] * 2;
                merged.Add(total);
                _score += total;
                i++;
            }
            else
            {
                merged.Add(values[i]);
            }
        }

        while (merged.Count < Size)
            merged.Add(0);

        for (var i = 0; i < Size; i++)
        {
            if (merged[i] != line[i])
            {
                moved = true;
                break;
            }
        }

        return merged.ToArray();
    }

    private void SpawnTile()
    {
        var emptyCells = new List<(int Row, int Col)>();
        for (var row = 0; row < Size; row++)
        {
            for (var col = 0; col < Size; col++)
            {
                if (_grid[row, col] == 0)
                    emptyCells.Add((row, col));
            }
        }

        if (emptyCells.Count == 0)
            return;

        var (row, col) = emptyCells[_random.Next(emptyCells.Count)];
        _grid[row, col] = _random.NextDouble() < 0.9 ? 2 : 4;
    }

    private bool CanMove()
    {
        for (var row = 0; row < Size; row++)
        {
            for (var col = 0; col < Size; col++)
            {
                if (_grid[row, col] == 0)
                    return true;

                if (col + 1 < Size && _grid[row, col + 1] == _grid[row, col])
                    return true;

                if (row + 1 < Size && _grid[row + 1, col] == _grid[row, col])
                    return true;
            }
        }
        return false;
    }

    private void Render()
    {
        Console.SetCursorPosition(0, 0);

        var header = $"Score: {_score}   High Score: {_highScore}   Controls: Arrow/WASD   U=Undo   R=Restart   Q=Quit";
        Console.WriteLine(header);
        Console.WriteLine(new string('-', 34));

        for (var row = 0; row < Size; row++)
        {
            for (var col = 0; col < Size; col++)
            {
                DrawCell(_grid[row, col]);
                Console.Write(" ");
            }
            Console.WriteLine();
        }
    }

    private void DrawCell(int value)
    {
        const int cellWidth = 7;
        var text = value == 0 ? "" : value.ToString();
        var pad = cellWidth - text.Length;
        var leftPad = pad / 2;
        var rightPad = pad - leftPad;

        var color = GetColor(value);
        Console.BackgroundColor = color.bg;
        Console.ForegroundColor = color.fg;

        Console.Write(new string(' ', leftPad));
        Console.Write(value == 0 ? " " : text);
        Console.Write(new string(' ', rightPad));

        Console.ResetColor();
    }

    private (ConsoleColor fg, ConsoleColor bg) GetColor(int value)
    {
        return value switch
        {
            0 => (ConsoleColor.Gray, ConsoleColor.Black),
            2 => (ConsoleColor.Black, ConsoleColor.DarkYellow),
            4 => (ConsoleColor.Black, ConsoleColor.Yellow),
            8 => (ConsoleColor.White, ConsoleColor.DarkRed),
            16 => (ConsoleColor.White, ConsoleColor.Red),
            32 => (ConsoleColor.White, ConsoleColor.DarkMagenta),
            64 => (ConsoleColor.White, ConsoleColor.Magenta),
            128 => (ConsoleColor.Black, ConsoleColor.Green),
            256 => (ConsoleColor.Black, ConsoleColor.DarkGreen),
            512 => (ConsoleColor.White, ConsoleColor.Blue),
            1024 => (ConsoleColor.White, ConsoleColor.DarkBlue),
            2048 => (ConsoleColor.White, ConsoleColor.Cyan),
            _ => (ConsoleColor.White, ConsoleColor.DarkCyan),
        };
    }

    private void RenderMessage(string message)
    {
        Console.SetCursorPosition(0, Size + 3);
        Console.WriteLine(message.PadRight(Console.WindowWidth - 1));
    }

    private int LoadHighScore()
    {
        try
        {
            var path = GetHighScorePath();
            if (!File.Exists(path))
                return 0;

            var json = File.ReadAllText(path);
            var doc = JsonDocument.Parse(json);
            if (doc.RootElement.TryGetProperty("highScore", out var element))
                return element.GetInt32();
        }
        catch
        {
            // Ignore bad file data and just continue.
        }

        return 0;
    }

    private void SaveHighScore()
    {
        try
        {
            var path = GetHighScorePath();
            var data = new { highScore = _highScore };
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(path, json);
        }
        catch
        {
            // Ignore save failures.
        }
    }

    private static string GetHighScorePath()
    {
        return Path.Combine(AppContext.BaseDirectory, "2048_highscore.json");
    }
}
