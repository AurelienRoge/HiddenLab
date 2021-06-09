//Gestion de la liste ouverte (openList)

#include "stdio.h"
#include "star_1.h"
#define MAXSIZE 400

typedef struct node3 {
	int len;
	close* arr[MAXSIZE];
}open;

//Initialisation de la liste ouverte (openList)
void initOpen(open* op) {
	op->len = 0;
}

//On charge des chemins à tester dans la liste ouverte
void pushOpen(open* op, close cls[SIZE + 1][SIZE + 1], int x, int y, int g) {
	int i, minFlag = op->len;
	close* t;
	cls[x][y].G = g;
	cls[x][y].F = g + cls[x][y].H;
	op->arr[op->len++] = &(cls[x][y]);
	for (i = 0; i < op->len - 1; i++) {
		if (op->arr[i]->F < op->arr[minFlag]->F)
			minFlag = i;
	}
	t = op->arr[minFlag];
	op->arr[minFlag] = op->arr[op->len - 1];
	op->arr[op->len - 1] = t;
}

void sortOpen(open* op) {
	int minFlag;
	int i;
	close* t;

	minFlag = op->len - 1;
	for (i = 0; i < op->len - 1; i++) {
		if (op->arr[i]->F < op->arr[minFlag]->F)
			minFlag = i;
	}
	t = op->arr[minFlag];
	op->arr[minFlag] = op->arr[op->len - 1];
	op->arr[op->len - 1] = t;
}

//On retire de la liste ouverte (openList)
close* popOpen(open* op) {
	return op->arr[--op->len];
}