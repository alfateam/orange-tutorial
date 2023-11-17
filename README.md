# Project Setup with SQL Server and Remote Containers in VS Code

This guide explains how to run the project with SQL Server using the Remote - Containers extension in Visual Studio Code.

## Prerequisites

- Docker must be installed on your machine.
- Visual Studio Code (VS Code) must be installed.
- The Remote - Containers extension should be installed in VS Code.

## Setup

Ensure your project directory contains the `docker-compose.yml` and `devcontainer.json` files.

## Steps to Run

1. **Start Docker**: Make sure Docker is running on your machine.

2. **Open Project in VS Code**:
   - Open your project folder in VS Code.

3. **Reopen in Container**:
   - Press `F1` to open the command palette.
   - Type and select "Remote-Containers: Reopen in Container".
   - VS Code will build the container based on your configuration files. This may take a few minutes.

4. **Working with SQL Server**:
   - The SQL Server instance is accessible on port `14330`.
   - Connect using a SQL client with the address `localhost,14330`, username `sa`, and password `P@assword123`.

5. **Development**:
   - Develop within the container. All defined extensions and settings in `devcontainer.json` will be available.

## Note

Always use the "Reopen in Container" option in VS Code to work within the Docker container environment for consistency and reproducibility.

Happy Coding!


__English script for video demo__
1. Map order, customer, orderLine, deliveryAddress
2. Insert customers wolfgang, harry and Hermine. Console.dir
3. Insert orders magic flute, [broomstick, magic wand], magic wand. 
4. SaveChanges: getOne where customer.name.eq('Hermine'). Change orderDate and add product book of monsters.
5. getMany any product broomstick
6. getMany all product contains magic
7. not
8. any magic or postalPlace Hamp
9. orderBy order orderDate desc, orderline orderBy product desc
10. limit

__Norwegian script for video demo__
1. Map order, customer, orderLine, deliveryAddress
2. Insert customers wolfgang, harry and Hermine. Console.dir
3. Insert orders tryllefløyte, [sopelime, tryllestav], bok om monster. 
4. SaveChanges: getOne where customer.name.eq('Hermine'). Change orderDate and add product sopelime.
5. getMany any product sopelime
6. getMany all product contains trylle
7. not
8. any trylle or postalPlace Hamp
9. orderBy order orderDate desc, orderline orderBy product desc
10. limit

