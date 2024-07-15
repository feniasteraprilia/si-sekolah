import Link from "next/link";

import {
  Activity,
  ArrowUpRight,
  School,
  BarChart,
  SpellCheck,
  CandyCane,
  Newspaper,
  Images,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Jumlah Siswa
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">423 Siswa</div>
              <p className="text-xs text-muted-foreground">
                165 siswa perempuan
              </p>
              <p className="text-xs text-muted-foreground">
                285 siswa laki-laki
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Jumlah Pengajar
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21 Tenaga Pengajar</div>
              <p className="text-xs text-muted-foreground">14 Guru Perempuan</p>
              <p className="text-xs text-muted-foreground">7 Guru Laki-Laki</p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ruang Kelas</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 Ruang Kelas</div>
              <p className="text-xs text-muted-foreground">
                Terdiri Dari Kelas X, XI, XII
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Terakreditasi
              </CardTitle>
              <SpellCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">A</div>
              <p className="text-xs text-muted-foreground">-</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Dokumentasi</CardTitle>
                <CardDescription>Tentang Sekolah</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64 w-full">
                <div className="flex gap-4">
                  <img
                    src="/images/sekolah.JPG"
                    alt="sekolah 1"
                    width="500"
                    height="auto"
                    className="object-cover"
                  />
                  <img
                    src="/images/ekkles.JPG"
                    alt="sekolah 2"
                    width="500"
                    height="auto"
                    className="object-cover"
                  />
                  <img
                    src="/images/sekolah.JPG"
                    alt="sekolah 3"
                    width="500"
                    height="auto"
                    className="object-cover"
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Pengumuman</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Newspaper className="h-10 w-10 text-muted-foreground" />
                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none">
                    Sekolah diliburkan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Mauris rhoncus aenean vel elit scelerisque mauris.
                  </p>
                </div>
                <div className="ml-auto font-medium"></div>
              </div>
              <div className="flex items-center gap-4">
                <Newspaper className="h-10 w-10 text-muted-foreground" />
                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none">Hari Guru</p>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Mauris rhoncus aenean vel elit scelerisque mauris.
                  </p>
                </div>
                <div className="ml-auto font-medium"></div>
              </div>
              <div className="flex items-center gap-4">
                <Newspaper className="h-10 w-10 text-muted-foreground" />
                <div className="grid gap-2">
                  <p className="text-sm font-medium leading-none">
                    Hari Kemerdekaan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Mauris rhoncus aenean vel elit scelerisque mauris.
                  </p>
                </div>
                <div className="ml-auto font-medium"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
