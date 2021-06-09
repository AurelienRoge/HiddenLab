//L'algorithme A* qui trouve le chemin le plus court dans un labyrinthe (ici seulement avec les mouvement haut bas droite gauche)
//On peut changer la taille dans star_1.h
//
#include "stdio.h"
#include "star_priQueue.h"


void printshortest(close cls[SIZE + 1][SIZE + 1], point start, point end) {
	close* steps[MAXSIZE];
	int flag = 1;
	int i;

	steps[0] = cls[end.x][end.y].from;
	for (i = 1;; i++) {
		steps[i] = steps[i - 1]->from;
		flag = i + 1;
		if (steps[i]->p.x == start.x && steps[i]->p.y == start.y)
			break;
	}
	tmpGlobal = flag;
	int compteur = 0;
	int currentPosition = 0;
	for (int p = flag - 1; p >= 0; p--) {
		positionsByOrder[compteur] = currentPosition;
		currentPosition = (steps[p]->p.y) - 1 + ((steps[p]->p.x) - 1) * taille;
		compteur++;
	}
	printf("\nThe shortest path takes %d moves", flag-2);
}

int within(int x, int y) {
	if (x >= 1 && x <= taille && y >= 1 && y <= taille)
		return 1;
	else
		return 0;
}
int getshortest(int maze[SIZE + 2][SIZE + 2], point start, point end) {
	close cls[SIZE+ 1][SIZE + 1];
	open op;
	close* c;
	int x0, y0;//position actuelle
	int x1, y1, g1;//noeud enfant
	int i, j;

	point dir[4];
	dir[0].x = 0; dir[0].y = 1;//Droite
	dir[1].x = 0; dir[1].y = -1;//Gauche
	dir[2].x = 1; dir[2].y = 0;//Bas
	dir[3].x = -1; dir[3].y = 0;//Haut

	initOpen(&op);
	initClose(cls, start.x, start.y, end.x, end.y);
	cls[start.x][start.y].visited = 1;

	pushOpen(&op, cls, 1, 1, 0);
	while (op.len != 0) {
		c = popOpen(&op);
		x0 = c->p.x;
		y0 = c->p.y;

		if (c->H == 0) {
			printshortest(cls, start, end);
			return 1;
		}
		for (i = 0; i < 4; i++) {
			x1 = x0 + dir[i].x;
			y1 = y0 + dir[i].y;
			if (within(x1, y1) == 1 && maze[x1][y1] == 0) {
				if (cls[x1][y1].visited == 0) {
					cls[x1][y1].visited = 1;
					cls[x1][y1].from = c;
					g1 = cls[x0][y0].G + 1;
					pushOpen(&op, cls, x1, y1, g1);
				}
				else {
					for (j = 0; j < op.len - 1; j++) {
						if (op.arr[j]->p.x == x1 && op.arr[j]->p.y == y1 && cls[x0][y0].G + 1 + cls[x0][y0].H < op.arr[j]->G) {
							op.arr[j]->F = cls[x0][y0].G + 1 + cls[x0][y0].H;
							op.arr[j]->from = &(cls[x0][y0]);
							sortOpen(&op);
						}
					}
				}
			}
			else
				continue;
		}
	}
	printf("x");
	return 0;
}



int main() {

	int f;
	int i, j;
	//On a instauré des murs tout autour qui permettent ainsi d'empecher l'algorithme de sortir de la carte
	//De ce fait, la taille est augmentée de 2 en abscisse et en ordonnée
	int maze[SIZE + 2][SIZE + 2] =
	{//Juste pour initialiser
		{ 1,1,1,1,1,1,1,1,1,1 },
		{ 1,0,0,0,0,0,0,0,0,1 },
		{ 1,0,0,1,1,0,0,1,0,1 },
		{ 1,0,0,0,0,1,0,1,1,1 },
		{ 1,1,0,1,0,0,0,0,0,1 },
		{ 1,1,0,0,1,0,0,0,0,1 },
		{ 1,0,0,1,0,0,0,0,0,1 },
		{ 1,1,1,0,1,0,1,0,0,1 },
		{ 1,0,0,1,0,1,0,0,0,1 },
		{ 1,1,1,1,1,1,1,1,1,1 },
	};

	//Adaptation du système en C au système en JS
	char* map;
	map = (char*)malloc(500 * sizeof(int));
	printf("\nInsert map here : \n");
	gets(map, sizeof(map), stdin);
	if (map != NULL) {
		for (int k = 0; k < taille * taille; k++) {
			for (int i = 0; i < strlen(map); i++) {
				if (map[i] == 44) {
					for (int j = i; j < strlen(map); j++) {
						map[j] = map[j + 1];
					}
				}
			}
		}
		taille = sqrt(strlen(map));
	}

	point start, end;
	start.x = 1;
	start.y = 1;
	end.x = taille;
	end.y = taille;

	//Convertir notre tableau en tableau à deux dimensions
	int compteur = 0;
	for (int i = 1; i < taille + 1; i++) {
		for (int j = 1; j < taille + 1; j++) {
			maze[i][j] = map[compteur];
			compteur++;
		}
	}

	for (int i = 0; i < taille + 2; i++) {
		for (int j = 0; j < taille + 2; j++) {
			if (maze[i][j] == 'B' || maze[i][j] == 'W' || j == 0 ||j == taille + 1 || i == 0 || i == taille + 1) {
				maze[i][j] = 1;
			}
			else {
				maze[i][j] = 0;
			}
		}
	}

	f = getshortest(maze, start, end);
	if (f == 0) {
		printf("This maze has no solution!");
	}
	printf("\n");
	for (int i = 0; i < tmpGlobal; i++) {
		positionsByOrder[i] = positionsByOrder[i + 1];
	}

	printf("\nFollow these moves in this exact order\n");
	int previousx = 0;
	int currentx = 0;
	int previousy = 0;
	int currenty = 0;
	for (int i = 0; i < tmpGlobal + 2; i++) {
		previousx = currentx;
		previousy = currenty;
		currenty = posToY(positionsByOrder[i]);
		currentx = posToX(positionsByOrder[i], currenty);
		if (currentx - previousx == 1) {
			printf("right ");
		}
		else if (currentx - previousx == -1) {
			printf("left ");
		}
		else if (currenty - previousy == 1) {
			printf("down ");
		}
		else if (currenty - previousy == -1) {
			printf("up ");
		}
	}
	printf("\n");
	return 0;
}
