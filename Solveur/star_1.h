#pragma once
#include "stdio.h"
#include "malloc.h"
#include "math.h"
#include "string.h"


# define SIZE 20//TAILLE

int taille = 8;
int positionsByOrder[400];
int tmpGlobal;

void printTab(char tab[], int size) {
	for (int i = 0; i < size * size; i++) {
		if (i % size == 0) {
			printf("%d\n", i - 1);
		}
		printf("%c ", tab[i]);
	}
}

int posToY(int pos) {
	int y = pos / taille;
	return y;
}

int posToX(int pos, int y) {
	int x = pos - y * taille;
	return x;
}


typedef struct node1 {
	int x;
	int y;
}point;

typedef struct node2 {
	point  p;
	struct node2* from;
	int H, F, G;
	int visited;
}close;//Liste fermée (closedList)

//Initialisation de la liste fermée
void initClose(close cls[SIZE + 1][SIZE + 1], int startx, int starty, int endx, int endy) {
	int i, j;
	for (i = 1; i <= taille; i++) {
		for (j = 1; j <= taille; j++) {
			cls[i][j].p.x = i;
			cls[i][j].p.y = j;
			cls[i][j].visited = 0;
			cls[i][j].G = cls[i][j].F = 0;
			cls[i][j].H = abs(i - endx) + abs(j - endy);//Calcul de l'heuristique
		}
	}
	cls[startx][starty].F = cls[startx][starty].H;//Evaluation du cout de départ
}
