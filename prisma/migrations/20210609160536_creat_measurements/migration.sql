-- CreateTable
CREATE TABLE "BeatMeasurement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "measurements" JSONB[],

    PRIMARY KEY ("id")
);
